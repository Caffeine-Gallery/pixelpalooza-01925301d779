export const idlFactory = ({ IDL }) => {
  const Image = IDL.Record({
    'id' : IDL.Nat,
    'content' : IDL.Vec(IDL.Nat8),
    'timestamp' : IDL.Int,
  });
  return IDL.Service({
    'getImages' : IDL.Func([], [IDL.Vec(Image)], ['query']),
    'uploadImage' : IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Nat], []),
  });
};
export const init = ({ IDL }) => { return []; };
