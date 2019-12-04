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

    var pointsPlane = [];

    function generateCube() {
      function generateOutline(a, b, c, d) {
        var indices = [a, b, b, c, c, d, d, a];
        for (var i = 0; i < indices.length; i++) {
          vertices.push(...cubePoints[indices[i]], ...[0.0, 0.5, 1.0]);
        }
      }
      generateOutline(0, 1, 2, 3);
      generateOutline(4, 5, 6, 7);
      for (var i = 0; i < 4; i++) {
        vertices.push(...cubePoints[i], ...[0.0, 0.5, 1.0]);
        vertices.push(...cubePoints[i + 4], ...[0.0, 0.5, 1.0]);
      }
      cubeSize = cubePoints.length * 3;
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
        [...kPoints[0], 0.1, 0.0, 1.0, 0.0],
        [...kPoints[1], 0.1, 0.0, 1.0, 0.0],
        [...kPoints[2], 0.1, 0.0, 1.0, 0.0],

        [...kPoints[1], 0.1, 0.0, 1.0, 0.0],
        [...kPoints[2], 0.1, 0.0, 1.0, 0.0],
        [...kPoints[3], 0.1, 0.0, 1.0, 0.0],

        [...kPoints[4], 0.1, 0.0, 1.0, 0.0],
        [...kPoints[7], 0.1, 0.0, 1.0, 0.0],
        [...kPoints[10], 0.1, 0.0, 1.0, 0.0],

        [...kPoints[4], 0.1, 0.0, 1.0, 0.0],
        [...kPoints[10], 0.1, 0.0, 1.0, 0.0],
        [...kPoints[11], 0.1, 0.0, 1.0, 0.0],

        [...kPoints[10], 0.1, 0.0, 1.0, 0.0],
        [...kPoints[7], 0.1, 0.0, 1.0, 0.0],
        [...kPoints[9], 0.1, 0.0, 1.0, 0.0],

        [...kPoints[7], 0.1, 0.0, 1.0, 0.0],
        [...kPoints[8], 0.1, 0.0, 1.0, 0.0],
        [...kPoints[9], 0.1, 0.0, 1.0, 0.0],

        [...kPoints[5], 0.1, 0.0, 1.0, 0.0],
        [...kPoints[6], 0.1, 0.0, 1.0, 0.0],
        [...kPoints[7], 0.1, 0.0, 1.0, 0.0],

        [...kPoints[4], 0.1, 0.0, 1.0, 0.0],
        [...kPoints[5], 0.1, 0.0, 1.0, 0.0],
        [...kPoints[7], 0.1, 0.0, 1.0, 0.0],

        [...kPoints[0], -0.1, 0.0, 1.0, 0.0],
        [...kPoints[1], -0.1, 0.0, 1.0, 0.0],
        [...kPoints[2], -0.1, 0.0, 1.0, 0.0],

        [...kPoints[1], -0.1, 0.0, 1.0, 0.0],
        [...kPoints[2], -0.1, 0.0, 1.0, 0.0],
        [...kPoints[3], -0.1, 0.0, 1.0, 0.0],

        [...kPoints[4], -0.1, 0.0, 1.0, 0.0],
        [...kPoints[7], -0.1, 0.0, 1.0, 0.0],
        [...kPoints[10], -0.1, 0.0, 1.0, 0.0],

        [...kPoints[4], -0.1, 0.0, 1.0, 0.0],
        [...kPoints[10], -0.1, 0.0, 1.0, 0.0],
        [...kPoints[11], -0.1, 0.0, 1.0, 0.0],

        [...kPoints[10], -0.1, 0.0, 1.0, 0.0],
        [...kPoints[7], -0.1, 0.0, 1.0, 0.0],
        [...kPoints[9], -0.1, 0.0, 1.0, 0.0],

        [...kPoints[7], -0.1, 0.0, 1.0, 0.0],
        [...kPoints[8], -0.1, 0.0, 1.0, 0.0],
        [...kPoints[9], -0.1, 0.0, 1.0, 0.0],

        [...kPoints[5], -0.1, 0.0, 1.0, 0.0],
        [...kPoints[6], -0.1, 0.0, 1.0, 0.0],
        [...kPoints[7], -0.1, 0.0, 1.0, 0.0],

        [...kPoints[4], -0.1, 0.0, 1.0, 0.0],
        [...kPoints[5], -0.1, 0.0, 1.0, 0.0],
        [...kPoints[7], -0.1, 0.0, 1.0, 0.0]
      ];

      for (var i = 0; i < k3D.length; i++) {
        vertices.push(...k3D[i]);
      }

      //3d k
      vertices.push(...[...kPoints[0], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[0], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[1], 0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[0], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[1], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[1], -0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[1], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[1], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[4], 0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[1], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[4], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[4], -0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[4], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[4], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[5], 0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[4], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[5], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[5], -0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[5], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[5], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[6], 0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[5], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[6], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[6], -0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[6], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[6], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[7], 0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[6], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[7], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[7], -0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[7], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[7], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[8], 0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[7], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[8], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[8], -0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[8], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[8], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[9], 0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[8], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[9], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[9], -0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[9], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[9], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[10], 0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[9], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[10], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[10], -0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[10], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[10], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[11], 0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[10], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[11], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[11], -0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[11], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[11], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[3], 0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[11], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[3], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[3], -0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[3], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[3], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[2], 0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[3], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[2], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[2], -0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[2], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[2], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[0], 0.1, 0.0, 1.0, 0.0]);

      vertices.push(...[...kPoints[2], -0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[0], 0.1, 0.0, 1.0, 0.0]);
      vertices.push(...[...kPoints[0], -0.1, 0.0, 1.0, 0.0]);

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

    gl.vertexAttribPointer(
      vPosition, // variabel yang memegang posisi attribute di shader
      3, // jumlah elemen per atribut
      gl.FLOAT, // tipe data atribut
      gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks (overall)
      0 // offset dari posisi elemen di array
    );
    gl.vertexAttribPointer(
      vColor, // variabel yang memegang posisi attribute di shader
      3, // jumlah elemen per atribut
      gl.FLOAT, // tipe data atribut
      gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks (overall)
      3 * Float32Array.BYTES_PER_ELEMENT // offset dari posisi elemen di array
    );
    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    var theta = 0;
    var thetaSpeed = 0.0;
    var axis = [true, true, true];
    var x = 0;
    var y = 1;
    var z = 2;

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

    // Kontrol menggunakan keyboard
    function onKeyDown(event) {
      if (event.key == "-") thetaSpeed -= 0.01;
      if (event.key == "=") thetaSpeed += 0.01;
      if (event.key == "0") thetaSpeed = 0; // key '0'
      if (event.key == "a") axis[x] = !axis[x];
      if (event.key == "s") axis[y] = !axis[y];
      if (event.key == "d") axis[z] = !axis[z];
      if (event.key == "ArrowUp") camera.z -= 0.1;
      else if (event.key == "ArrowDown") camera.z += 0.1;
    }
    document.addEventListener("keydown", onKeyDown);

    function detectCollision() {
      for (var i = 0; i < currentPositionK.length; i++) {
        var epsilon = 0.001;
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
      theta += thetaSpeed;
      if (axis[z]) glMatrix.mat4.rotateZ(modelMatrix, modelMatrix, thetaSpeed);
      if (axis[y]) glMatrix.mat4.rotateY(modelMatrix, modelMatrix, thetaSpeed);
      if (axis[x]) glMatrix.mat4.rotateX(modelMatrix, modelMatrix, thetaSpeed);
      gl.uniformMatrix4fv(mmLoc, false, modelMatrix);
      gl.drawArrays(gl.LINES, 0, cubeSize);
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
      drawCube();
      drawK();
      detectCollision();
      requestAnimationFrame(render);
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    render();
  }
})();
