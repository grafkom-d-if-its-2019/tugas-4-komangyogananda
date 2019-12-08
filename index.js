(function() {
  glUtils.SL.init({
    callback: function() {
      main();
    }
  });
  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
    var vertexShader = glUtils.getShader(
      gl,
      gl.VERTEX_SHADER,
      glUtils.SL.Shaders.v1.vertex
    );
    var fragmentShader = glUtils.getShader(
      gl,
      gl.FRAGMENT_SHADER,
      glUtils.SL.Shaders.v1.fragment
    );
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    // Mendefinisikan verteks-verteks
    var vertices = [];
    var kDirections = [1.0, 1.0, 1.0];
    var kCenter = glMatrix.vec3.fromValues(0.0, 0.0, 0.0);

    var kSize, cubeSize;
    var cubePoints = [
      [-0.5, -0.5, 0.5], //a
      [-0.5, 0.5, 0.5], //e
      [0.5, 0.5, 0.5], //f
      [0.5, -0.5, 0.5], //b
      [-0.5, -0.5, -0.5], //d
      [-0.5, 0.5, -0.5], //h
      [0.5, 0.5, -0.5], //g
      [0.5, -0.5, -0.5] //c
    ];
    var cubeColors = [
      [],
      [0.0, 0.0, 0.0], // hijau
      [0.0, 0.0, 0.0], // merah
      [0.0, 0.0, 0.0], // biru
      [0.0, 0.0, 0.0], // putih
      [0.0, 0.0, 0.0], // oranye
      [0.0, 0.0, 0.0], // kuning
      []
    ];
    var cubeNormals = [
      [],
      [0.0, 0.0, 1.0], // depan
      [1.0, 0.0, 0.0], // kanan
      [0.0, -1.0, 0.0], // bawah
      [0.0, 0.0, -1.0], // belakang
      [-1.0, 0.0, 0.0], // kiri
      [0.0, 1.0, 0.0], // atas
      []
    ];

    var pointsPlane = [];

    function generateCube() {
      function quad(a, b, c, d) {
        var indices = [a, b, c, a, c, d];
        for (var i = 0; i < indices.length; i++) {
          vertices.push(...cubePoints[indices[i]]);
          vertices.push(...cubeColors[a]);
          vertices.push(...cubeNormals[a].map(normal => -1 * normal));
          switch (indices[i]) {
            case a:
              vertices.push((a - 2) * 0.125);
              vertices.push(0.0);
              break;
            case b:
              vertices.push((a - 2) * 0.125);
              vertices.push(1.0);
              break;
            case c:
              vertices.push((a - 1) * 0.125);
              vertices.push(1.0);
              break;
            case d:
              vertices.push((a - 1) * 0.125);
              vertices.push(0.0);
              break;

            default:
              break;
          }
        }
      }
      // quad(1, 0, 3, 2);
      quad(2, 3, 7, 6);
      quad(3, 0, 4, 7);
      quad(4, 5, 6, 7);
      quad(5, 4, 0, 1);
      quad(6, 5, 1, 2);

      cubeSize = 30;
    }

    var kPoints = [
      [-0.5, 0.5], //a 0
      [-0.2, 0.5], //b 1
      [-0.5, -0.5], //c 2
      [-0.2, -0.5], //d 3
      [-0.2, 0.1], //e 4
      [0.3, 0.5], //f 5
      [0.5, 0.3], //g 6
      [0.2, 0], //h 7
      [0.5, -0.4], //i 8
      [0.3, -0.5], //j 9
      [0, -0.2], //k 10
      [-0.2, -0.3] //l 11
    ];

    var currentPositionK = [];
    var currentPositionCube = [];

    function generateHuruf() {
      var k3D = [
        [...kPoints[0], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[1], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[2], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],

        [...kPoints[1], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[2], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[3], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],

        [...kPoints[4], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[7], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[10], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],

        [...kPoints[4], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[10], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[11], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],

        [...kPoints[10], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[7], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[9], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],

        [...kPoints[7], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[8], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[9], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],

        [...kPoints[5], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[6], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[7], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],

        [...kPoints[4], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[5], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[7], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],

        [...kPoints[0], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[1], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[2], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],

        [...kPoints[1], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[2], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[3], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],

        [...kPoints[4], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[7], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[10], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],

        [...kPoints[4], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[10], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[11], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],

        [...kPoints[10], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[7], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[9], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],

        [...kPoints[7], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[8], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[9], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],

        [...kPoints[5], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[6], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[7], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],

        [...kPoints[4], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[5], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [...kPoints[7], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      ];

      for (var i = 0; i < k3D.length; i++) {
        vertices.push(...k3D[i]);
      }

      //3d k
      vertices.push(
        ...[...kPoints[0], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[0], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[1], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[0], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[1], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[1], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[1], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[1], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[4], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[1], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[4], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[4], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[4], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[4], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[5], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[4], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[5], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[5], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[5], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[5], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[6], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[5], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[6], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[6], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[6], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[6], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[7], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[6], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[7], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[7], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[7], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[7], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[8], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[7], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[8], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[8], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[8], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[8], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[9], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[8], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[9], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[9], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[9], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[9], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[10], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[9], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[10], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[10], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[10], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[10], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[11], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[10], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[11], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[11], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[11], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[11], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[3], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[11], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[3], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[3], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[3], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[3], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[2], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[3], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[2], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[2], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[2], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[2], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[0], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      vertices.push(
        ...[...kPoints[2], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[0], 0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );
      vertices.push(
        ...[...kPoints[0], -0.1, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      );

      kSize = (k3D.length * 3) / 2;
    }

    generateCube();
    generateHuruf();

    // Membuat vertex buffer object (CPU Memory <==> GPU Memory)
    var vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Membuat sambungan untuk attribute
    var vPosition = gl.getAttribLocation(program, "vPosition");
    var vColor = gl.getAttribLocation(program, "vColor");
    var vNormal = gl.getAttribLocation(program, "vNormal");
    var vTexCoord = gl.getAttribLocation(program, "vTexCoord");

    gl.vertexAttribPointer(
      vPosition, // variabel yang memegang posisi attribute di shader
      3, // jumlah elemen per atribut
      gl.FLOAT, // tipe data atribut
      gl.FALSE,
      11 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks (overall)
      0 // offset dari posisi elemen di array
    );
    gl.vertexAttribPointer(
      vColor, // variabel yang memegang posisi attribute di shader
      3, // jumlah elemen per atribut
      gl.FLOAT, // tipe data atribut
      gl.FALSE,
      11 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks (overall)
      3 * Float32Array.BYTES_PER_ELEMENT // offset dari posisi elemen di array
    );
    gl.vertexAttribPointer(
      vNormal,
      3,
      gl.FLOAT,
      gl.FALSE,
      11 * Float32Array.BYTES_PER_ELEMENT,
      6 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.vertexAttribPointer(
      vTexCoord,
      2,
      gl.FLOAT,
      gl.FALSE,
      11 * Float32Array.BYTES_PER_ELEMENT,
      9 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);
    gl.enableVertexAttribArray(vNormal);
    gl.enableVertexAttribArray(vTexCoord);

    var x;

    // Definisi untuk matriks model
    var mmLoc = gl.getUniformLocation(program, "modelMatrix");
    var modelMatrix = glMatrix.mat4.create();
    glMatrix.mat4.translate(modelMatrix, modelMatrix, [0.0, 0.0, -2.0]);

    // Definisi untuk matrix view dan projection
    var viewMatrixLoc = gl.getUniformLocation(program, "viewMatrix");
    var viewMatrix = glMatrix.mat4.create();
    var pmLoc = gl.getUniformLocation(program, "projectionMatrix");
    var pm = glMatrix.mat4.create();
    var camera = { x: 0.0, y: 0.0, z: 0.0 };
    glMatrix.mat4.perspective(
      pm,
      glMatrix.glMatrix.toRadian(90), // fovy dalam radian
      canvas.width / canvas.height, // aspect ratio
      0.5, // near
      10.0 // far
    );
    gl.uniformMatrix4fv(pmLoc, false, pm);

    // Uniform untuk pencahayaan
    var dcLoc = gl.getUniformLocation(program, "diffuseColor");
    var dc = glMatrix.vec3.fromValues(1.0, 1.0, 1.0); // rgb
    gl.uniform3fv(dcLoc, dc);
    var ddLoc = gl.getUniformLocation(program, "diffusePosition");

    var acLoc = gl.getUniformLocation(program, "ambientColor");
    var ac = glMatrix.vec3.fromValues(0.17, 0.41, 0.14);
    gl.uniform3fv(acLoc, ac);

    // Uniform untuk modelMatrix vektor normal
    var nmLoc = gl.getUniformLocation(program, "normalMatrix");

    // Kontrol menggunakan mouse
    var lastMousePosition = {
      x: 0,
      y: 0
    };
    var isDragging = false;
    function onMouseDown(event) {
      isDragging = true;
    }
    function onMouseMove(event) {
      event.preventDefault();
      deltaMove = {
        x: event.x - lastMousePosition.x,
        y: event.y - lastMousePosition.y
      };
      if (isDragging) {
        var radx = glMatrix.glMatrix.toRadian(deltaMove.x);
        var rady = glMatrix.glMatrix.toRadian(deltaMove.y);
        var quat = glMatrix.quat.create();
        glMatrix.quat.rotateX(quat, quat, rady);
        glMatrix.quat.rotateY(quat, quat, radx);
        var rotateMat = glMatrix.mat4.create();
        glMatrix.mat4.fromQuat(rotateMat, quat);
        glMatrix.mat4.multiply(modelMatrix, modelMatrix, rotateMat);
      }
      lastMousePosition = {
        x: event.x,
        y: event.y
      };
    }
    function onMouseUp(event) {
      event.preventDefault();
      isDragging = false;
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    function detectCollision() {
      for (var i = 0; i < currentPositionK.length; i++) {
        var epsilon = 0.01;
        var idx = -1;
        for (var j = 0; j < pointsPlane.length; j++) {
          var dist = distanceFromPlane(pointsPlane[j], currentPositionK[i]);
          if (dist <= epsilon) {
            idx = j;
            break;
          }
        }

        if (idx == 0) {
          if (kDirections[2] > 0) kDirections[2] *= -1;
          break;
        } else if (idx == 1) {
          if (kDirections[0] > 0) kDirections[0] *= -1;
          break;
        } else if (idx == 2) {
          if (kDirections[2] < 0) kDirections[2] *= -1;
          break;
        } else if (idx == 3) {
          if (kDirections[0] < 0) kDirections[0] *= -1;
          break;
        } else if (idx == 4) {
          if (kDirections[1] < 0) kDirections[1] *= -1;
          break;
        } else if (idx == 5) {
          if (kDirections[1] > 0) kDirections[1] *= -1;
          break;
        }
      }
    }

    function distanceFromPlane(paramPlane, point) {
      var v = glMatrix.vec3.create();
      var firstVector = glMatrix.vec3.create();
      var secondVector = glMatrix.vec3.create();
      var normal = glMatrix.vec3.create();
      glMatrix.vec3.subtract(v, point, paramPlane[0]);
      glMatrix.vec3.subtract(firstVector, paramPlane[1], paramPlane[0]);
      glMatrix.vec3.subtract(secondVector, paramPlane[2], paramPlane[1]);
      glMatrix.vec3.cross(normal, firstVector, secondVector);
      var ans = glMatrix.vec3.dot(v, normal);
      return Math.abs(ans);
    }

    function matrix_mult(a, b) {
      var c1, c2, c3, c4;
      c1 = a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3];
      c2 = a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3];
      c3 = a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3];
      c4 = a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3];
      return [c1, c2, c3, c4];
    }

    var trans = [0.0, 0.0, 0.0];
    var rotateK = 0;

    function drawCube() {
      gl.uniformMatrix4fv(mmLoc, false, modelMatrix);
      gl.drawArrays(gl.TRIANGLES, 0, cubeSize);
      currentPositionCube = [];
      for (var i = 0; i < cubePoints.length; i++) {
        x = matrix_mult(modelMatrix, [...cubePoints[i], 1.0]);
        currentPositionCube.push(x);
      }
      pointsPlane = [
        [
          currentPositionCube[0],
          currentPositionCube[1],
          currentPositionCube[2]
        ],
        [
          currentPositionCube[2],
          currentPositionCube[3],
          currentPositionCube[6]
        ],
        [
          currentPositionCube[6],
          currentPositionCube[7],
          currentPositionCube[5]
        ],
        [
          currentPositionCube[5],
          currentPositionCube[4],
          currentPositionCube[1]
        ],
        [
          currentPositionCube[0],
          currentPositionCube[3],
          currentPositionCube[7]
        ],
        [currentPositionCube[1], currentPositionCube[2], currentPositionCube[6]]
      ];
    }

    function drawK() {
      // pencahayaan
      kCenter[0] = trans[0];
      kCenter[1] = trans[1];
      kCenter[2] = trans[2];
      var dd = glMatrix.vec3.fromValues(kCenter[0], kCenter[1], kCenter[2]); // xyz
      gl.uniform3fv(ddLoc, dd);

      var kModelMatrix = glMatrix.mat4.create();
      glMatrix.mat4.copy(kModelMatrix, modelMatrix);
      glMatrix.mat4.translate(kModelMatrix, kModelMatrix, [
        trans[0],
        trans[1],
        trans[2]
      ]);
      glMatrix.mat4.scale(kModelMatrix, kModelMatrix, [1 / 4, 1 / 4, 1 / 4]);
      glMatrix.mat4.rotate(kModelMatrix, kModelMatrix, rotateK, [
        0.0,
        1.0,
        0.0
      ]);
      currentPositionK = [];
      var select = [0, 2, 5, 6, 8, 9];
      for (var i = 0; i < select.length; i++) {
        x = matrix_mult(kModelMatrix, [...kPoints[select[i]], 0.1, 1.0]);
        currentPositionK.push(x);
        x = matrix_mult(kModelMatrix, [...kPoints[select[i]], -0.1, 1.0]);
        currentPositionK.push(x);
      }

      for (var i = 0; i < 3; i++) {
        trans[i] += kDirections[i] * 0.003;
      }
      rotateK += 0.01;

      gl.uniformMatrix4fv(mmLoc, false, kModelMatrix);
      gl.drawArrays(gl.TRIANGLES, cubeSize, kSize);
      gl.drawArrays(
        gl.TRIANGLES,
        cubeSize + kSize,
        vertices.length - cubeSize - kSize
      );

      gl.uniformMatrix4fv(mmLoc, false, kModelMatrix);
    }

    function render() {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      glMatrix.mat4.lookAt(
        viewMatrix,
        [camera.x, camera.y, camera.z], // di mana posisi kamera (posisi)
        [0.0, 0.0, -2.0], // ke mana kamera menghadap (vektor)
        [0.0, 1.0, 0.0] // ke mana arah atas kamera (vektor)
      );
      gl.uniformMatrix4fv(viewMatrixLoc, false, viewMatrix);

      // Perhitungan modelMatrix untuk vektor normal
      var nm = glMatrix.mat3.create();
      glMatrix.mat3.normalFromMat4(nm, modelMatrix);
      gl.uniformMatrix3fv(nmLoc, false, nm);

      drawCube();
      drawK();
      detectCollision();
      requestAnimationFrame(render);
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    // Uniform untuk tekstur
    var sampler0Loc = gl.getUniformLocation(program, "sampler0");
    gl.uniform1i(sampler0Loc, 0);

    // Create a texture.
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Fill the texture with a 1x1 blue pixel.
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 255, 255])
    );

    // Asynchronously load an image
    var image = new Image();
    image.src = "images/texture.png";
    image.addEventListener("load", function() {
      // Now that the image has loaded make copy it to the texture.
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );
      gl.generateMipmap(gl.TEXTURE_2D);
    });

    render();
  }
})();
