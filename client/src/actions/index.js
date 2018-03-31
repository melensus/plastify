import { registerActions, actions } from '../actionHelpers';

import VersionInfo from './VersionInfo';
import Giphy from './Giphy';

registerActions([VersionInfo, Giphy]);

export const Action = actions;
