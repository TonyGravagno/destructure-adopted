import * as tslib from 'typescript/lib/tsserverlibrary';
import { Refactor } from '../common/refactor';
import { DestructureProperty } from './destructure-property';
import { DestructureInPlace } from './destructure-in-place';
import { DestructureSpread } from './destructure-spread';
import { DestructureToConstant } from './destructure-to-constant';
import { RollIntoSpread } from './roll-into-spread';

export const availableRefactors: Refactor[] = [];

export const initRefactors = (info: tslib.server.PluginCreateInfo) => {
  const availableRefactorsClasses = [
    DestructureProperty,
    DestructureInPlace,
    DestructureSpread,
    DestructureToConstant,
    RollIntoSpread,
  ]

  availableRefactorsClasses.forEach((claz) => {
    availableRefactors.push(new claz(info));
  })
}