import * as tslib from 'typescript/lib/tsserverlibrary';
import { Refactor, ERefactorKind } from "../common/Refactor";
import { getNodeByLocation, getNodeType, getTypeDestructuring, createTextEdit } from '../utils'

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
      node.kind === tslib.SyntaxKind.Identifier &&
      node.parent.kind === tslib.SyntaxKind.Parameter
    );
  }

  apply(
    fileName: string,
    formatOptions: tslib.FormatCodeSettings,
    positionOrRange: number | tslib.TextRange,
    refactorName: string,
    actionName: string,
    preferences: tslib.UserPreferences | undefined
  ) {
    const node = getNodeByLocation(this.info, fileName, positionOrRange);
    const type = node && getNodeType(this.info, node);

    if (!node || !type) {
      return;
    }

    const destructStatement = `{ ${ getTypeDestructuring(type) } }`;

    return createTextEdit(
      fileName,
      positionOrRange,
      destructStatement || ''
    );
  }
}