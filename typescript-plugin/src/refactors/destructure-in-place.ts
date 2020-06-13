import * as tslib from 'typescript/lib/tsserverlibrary';
import { Refactor, ERefactorKind } from '../common/Refactor';
import {
  getNodeByLocation,
  getNodeType,
  createObjectBindingPatternForType,
  printNode,
  createTextEdit,
  isDestructurable,
} from '../utils';

export class DestructureInPlace extends Refactor {
  name = ERefactorKind.destructureInPlace;
  description = 'Деструктурировать обьект на месте';
  actions = [
    {
      name: ERefactorKind.destructureInPlace,
      description: 'Destructure object (inplace)',
    },
  ];

  canBeApplied(node?: tslib.Node) {
    return (
      node &&
      isDestructurable(this.info, node) &&
      tslib.isParameter(node.parent)
    );
  }

  apply(
    fileName: string,
    formatOptions: tslib.FormatCodeSettings,
    positionOrRange: number | tslib.TextRange,
    refactorName: string,
    actionName: string,
    preferences: tslib.UserPreferences | undefined
  ): tslib.RefactorEditInfo | undefined {
    const node = getNodeByLocation(this.info, fileName, positionOrRange);
    const type = node && getNodeType(this.info, node);

    if (!node || !type) {
      return;
    }

    const bindingPatternNode = createObjectBindingPatternForType(type);
    const newText = printNode(
      this.info,
      fileName,
      bindingPatternNode,
    );

    if (!newText) {
      return;
    }

    return createTextEdit(
      fileName,
      node,
      newText
    );
  }
}
