import { ITreeNode } from '@blueprintjs/core';
import { WatcherKind } from '../types';

export interface WatcherTreeNode extends ITreeNode {
  readonly id: string;
  readonly kind: WatcherKind;
}

export interface FolderTreeNode extends ITreeNode {
  readonly id: string;
  readonly kind: 'folder';
}

export type GenericTreeNode = WatcherTreeNode | FolderTreeNode;
