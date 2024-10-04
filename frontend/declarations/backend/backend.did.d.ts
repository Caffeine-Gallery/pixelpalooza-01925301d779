import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Image {
  'id' : bigint,
  'content' : Uint8Array | number[],
  'timestamp' : bigint,
}
export type UploadResult = { 'ok' : bigint } |
  { 'err' : string };
export interface _SERVICE {
  'getImages' : ActorMethod<[], Array<Image>>,
  'uploadImage' : ActorMethod<[Uint8Array | number[]], UploadResult>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
