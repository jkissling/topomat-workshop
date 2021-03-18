interface Point {
    x: number;
    y: number;
}

interface Point3d extends Point { z: number; }

class MyPoint implements Point3d {
    x = 0;
    y = 0;
    z = 0;
}

class My4dPoint extends MyPoint {
    time = Date.now();
}