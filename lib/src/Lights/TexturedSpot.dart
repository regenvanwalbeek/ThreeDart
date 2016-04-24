part of ThreeDart.Lights;

/// Storage for textured spot light data.
class TexturedSpot implements Light {

  /// Creates a new textured spot light data.
  TexturedSpot({
      Movers.Mover mover: null,
      Math.Color3 color: null,
      Textures.Texture2D texture: null,
      double fov: null,
      double ratio: null,
      double attenuation0: null,
      double attenuation1: null,
      double attenuation2: null}) {
    this.mover        = mover;
    this.color        = color;
    this.texture      = texture;
    this.fov          = fov;
    this.ratio        = ratio;
    this.attenuation0 = attenuation0;
    this.attenuation1 = attenuation1;
    this.attenuation2 = attenuation2;
    this._position    = new Math.Point3(0.0, 0.0, 0.0);
    this._direction   = new Math.Vector3(0.0, 0.0, 1.0);
    this._up          = new Math.Vector3(0.0, 1.0, 0.0);
  }

  /// Updates the light with the current state.
  void update(Core.RenderState state) {
    this._position  = new Math.Point3(0.0, 0.0, 0.0);
    this._direction = new Math.Vector3(0.0, 0.0, 1.0);
    this._up        = new Math.Vector3(0.0, 1.0, 0.0);
    if (this._mover != null) {
      Math.Matrix4 mat = this._mover.update(state, this);
      if (mat != null) {
        this._position  = mat.transPnt3(this._position);
        this._direction = mat.transVec3(this._direction);
        this._up        = mat.transVec3(this._up);
      }
    }
  }

  /// Binds the light to the given [state].
  void bind(Core.RenderState state){
    if(this.texture != null) this.texture.bind(state);
  }

  /// Unbinds the bound the light  from the given [state].
  void unbind(Core.RenderState state) {
    if(this.texture != null) this.texture.unbind(state);
  }

  /// The location the light.
  Math.Point3 get position => this._position;
  Math.Point3 _position;

  /// The direction the light is pointing.
  Math.Vector3 get direction => this._direction;
  Math.Vector3 _direction;

  /// The direction the light is pointing.
  Math.Vector3 get up => this._up;
  Math.Vector3 _up;

  /// The mover to position this light.
  Movers.Mover get mover => this._mover;
  set mover(Movers.Mover mover) => this._mover = mover;
  Movers.Mover _mover;

  /// The color of the light.
  Math.Color3 get color => this._color;
  set color(Math.Color3 color) =>
    this._color = (color == null)? new Math.Color3.white(): color;
  Math.Color3 _color;

  /// The texture for the light.
  Textures.Texture2D get texture => this._texture;
  set texture(Textures.Texture2D texture) => this._texture = texture;
  Textures.Texture2D _texture;

  /// The feild-of-view of the light in the y-axis (up) of the texture.
  double get fov => this._fov;
  set fov(double fov) =>
    this._fov = (fov == null)? math.PI/3.0:
    Math.clampVal(fov, 0.0, math.PI);
  double _fov;

  /// The ratio width to height of the texture.
  double get ratio => this._ratio;
  set ratio(double ratio) =>
    this._ratio = (ratio == null)? 1.0: ratio;
  double _ratio;

  /// The constant attenuation factor of the light.
  double get attenuation0 => this._attenuation0;
  set attenuation0(double attenuation0) =>
    this._attenuation0 = (attenuation0 == null)? 0.0: attenuation0;
  double _attenuation0;

  /// The linear attenuation factor of the light.
  double get attenuation1 => this._attenuation1;
  set attenuation1(double attenuation1) =>
    this._attenuation1 = (attenuation1 == null)? 0.0: attenuation1;
  double _attenuation1;

  /// The quadratic attenuation factor of the light.
  double get attenuation2 => this._attenuation2;
  set attenuation2(double attenuation2) =>
    this._attenuation2 = (attenuation2 == null)? 0.0: attenuation2;
  double _attenuation2;
}
