export const idlFactory = ({ IDL }) => {
  const Image = IDL.Record({
    'id' : IDL.Nat,
    'content' : IDL.Vec(IDL.Nat8),
    'timestamp' : IDL.Int,
  });
  const UploadResult = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  return IDL.Service({
    'getImages' : IDL.Func([], [IDL.Vec(Image)], ['query']),
    'uploadImage' : IDL.Func([IDL.Vec(IDL.Nat8)], [UploadResult], []),
  });
};
export const init = ({ IDL }) => { return []; };
