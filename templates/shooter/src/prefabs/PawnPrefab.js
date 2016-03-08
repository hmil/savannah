
var PawnPrefab = Entity.create({
  name: 'PawnPrefab',
  components: [
    {
      type: Transform,
      params: {}
    },
    {
      type: RawGraphics,
      params: {}
    },
    {
      type: Pawn,
      params: {}
    }
  ]
});
