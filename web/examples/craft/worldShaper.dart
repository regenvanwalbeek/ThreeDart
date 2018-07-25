part of craft;

class CubeData {
  final int topIndex;
  final int bottomIndex;
  final int leftIndex;
  final int rightIndex;
  final int frontIndex;
  final int backIndex;

  CubeData(int this.topIndex, int this.bottomIndex, int this.leftIndex, int this.rightIndex, int this.frontIndex, int this.backIndex);
}

class WorldShaper {
  static const String imgFolder = "./examples/craft/resources/";
  static const String fileExt = ".png";

  ThreeDart.ThreeDart _td;
  Map<int, CubeData> _cubeData;
  Map<int, List<int>> _matData;
  List<ThreeDart.Entity> _entities;
  Lights.Directional _light;

  WorldShaper(this._td) {
    this._cubeData = new Map<int, CubeData>();
    this._matData = new Map<int, List<int>>();
    this._entities = new List<ThreeDart.Entity>();
    this._light = new Lights.Directional(color: new Math.Color3.white(),
      mover: new Movers.Constant.lookAtTarget(new Math.Point3.zero(),
      new Math.Vector3(0.0, 0.0, 1.0), new Math.Point3(0.0, -1.0, 0.2)));

    int brick          = this._addMat("brick");
    int dirt           = this._addMat("dirt");
    int dryLeavesSide  = this._addMat("dryLeavesSide");
    int dryLeavesTop   = this._addMat("dryLeavesTop");
    int leaves         = this._addMat("leaves");
    int rock           = this._addMat("rock");
    int sand           = this._addMat("sand");
    int trunkEnd       = this._addMat("trunkEnd");
    int trunkSide      = this._addMat("trunkSide");
    int turfSide       = this._addMat("turfSide");
    int turfTop        = this._addMat("turfTop");

    int blackShine     = this._addMat("blackShine", true);
    int redShine       = this._addMat("redShine", true);
    int yellowShine    = this._addMat("yellowShine", true);
    int whiteShine     = this._addMat("whiteShine", true);

    int mushroomBottom = this._addMat("mushroomBottom");
    int mushroomSide   = this._addMat("mushroomSide");
    int mushroomTop    = this._addMat("mushroomTop");

    // Load alpha materials (done later so that the entities made in shaper are drawn later)
    int grass          = this._addMat("grass");
    int fern         = this._addMat("fern");
    int blueFlowers  = this._addMat("blueFlowers");
    int redFlowers   = this._addMat("redFlowers");
    int whiteFlowers = this._addMat("whiteFlowers");
    int water        = this._addMat("water1", true); // TODO: Animate the water

    // Special materials not used in blocks
    // int selection = this._addMat("selection");
    // int crosshair = this._addMat("crosshair");

    //                                       top,           bottom,        left,          right,         front,         back
    this._addCubeData(BlockType.Dirt,        dirt,          dirt,          dirt,          dirt,          dirt,          dirt);
    this._addCubeData(BlockType.Turf,        turfTop,       dirt,          turfSide,      turfSide,      turfSide,      turfSide);
    this._addCubeData(BlockType.Rock,        rock,          rock,          rock,          rock,          rock,          rock);
    this._addCubeData(BlockType.Sand,        sand,          sand,          sand,          sand,          sand,          sand);
    this._addCubeData(BlockType.DryLeaves,   dryLeavesTop,  dirt,          dryLeavesSide, dryLeavesSide, dryLeavesSide, dryLeavesSide);
    this._addCubeData(BlockType.Trunk,       trunkEnd,      trunkEnd,      trunkSide,     trunkSide,     trunkSide,     trunkSide);
    this._addCubeData(BlockType.Brick,       brick,         brick,         brick,         brick,         brick,         brick);
    this._addCubeData(BlockType.RedShine,    redShine,      redShine,      redShine,      redShine,      redShine,      redShine);
    this._addCubeData(BlockType.WhiteShine,  whiteShine,    whiteShine,    whiteShine,    whiteShine,    whiteShine,    whiteShine);
    this._addCubeData(BlockType.YellowShine, yellowShine,   yellowShine,   yellowShine,   yellowShine,   yellowShine,   yellowShine);
    this._addCubeData(BlockType.BlackShine,  blackShine,    blackShine,    blackShine,    blackShine,    blackShine,    blackShine);
    this._addCubeData(BlockType.Leaves,      leaves,        leaves,        leaves,        leaves,        leaves,        leaves);
    this._addCubeData(BlockType.Water,       water,         water,         water,         water,         water,         water);

    this._addMatData(BlockType.Grass,       [grass]);
    this._addMatData(BlockType.Fern,        [fern]);
    this._addMatData(BlockType.WhiteFlower, [whiteFlowers]);
    this._addMatData(BlockType.BlueFlower,  [blueFlowers]);
    this._addMatData(BlockType.RedFlower,   [redFlowers]);
    this._addMatData(BlockType.Mushroom,    [mushroomTop, mushroomBottom, mushroomSide]);
  }
  
  CubeData cubeData(int value) => this._cubeData[value];
  List<int> matData(int value) => this._matData[value];
  List<ThreeDart.Entity> get entities => this._entities;

  int _addMat(String fileName, [bool shiny = false]) {
    String path = imgFolder + fileName + fileExt;
    Textures.Texture2D blockTxt = this._td.textureLoader.
      load2DFromFile(path, wrapEdges: false, nearest: false, mipMap: true);

    Techniques.MaterialLight tech = new Techniques.MaterialLight()
      ..lights.add(this._light)
      ..emission.texture2D = blockTxt
      ..alpha.texture2D = blockTxt;

    if (shiny) {
      tech.specular
        ..color = new Math.Color3.white()
        ..shininess = 40.0;
    }

    this._entities.add(new ThreeDart.Entity(tech: tech));
    return this._entities.length - 1;
  }

  void _addCubeData(int value, int topIndex, int bottomIndex, int leftIndex, int rightIndex, int frontIndex, int backIndex) {
    this._cubeData[value] = new CubeData(topIndex, bottomIndex, leftIndex, rightIndex, frontIndex, backIndex);
  }

  void _addMatData(int value, List<int> indices) {
    this._matData[value] = indices;
  }
}
