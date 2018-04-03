import { registerActions, actions } from '../actionHelpers';

import VersionInfo from './VersionInfo';
import Giphy from './Giphy';
import OpenTile from './OpenTile';
import CloseTile from './CloseTile';

registerActions([VersionInfo, Giphy, OpenTile, CloseTile]);

export const Action = actions;
