import { Component, OnInit } from "@angular/core";

const rotationPointers = {
  UNICORN: {
    src: 'assets/unicorn.gif',
    pointerAngle: 56,
  },
  ELSA: {
    src: 'assets/elsa.png',
    pointerAngle: 35,
  },
  CHETAN: {
    src: 'assets/chetan.png',
    pointerAngle: 40,
  }
};

@Component({
  selector: "app-spinner",
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.styl"]
})
export class SpinnerComponent implements OnInit {
  namesInput = "";
  namesArray = [];
  spinSound;
  winSound;
  numberOfRuns = 0;
  currentPointer = rotationPointers.UNICORN;
  constructor() {
    this.spinSound = new Audio();
    this.spinSound.src = "../../assets/magic-chime-01.mp3";
    this.spinSound.load();
  }

  ngOnInit() {}

  spinUnicorn(evt) {
    evt.preventDefault();
    this.addNames();
    this.spin();
  }

  maybeSwitchPointer() {
    const names = this.namesInput.split("\n").filter(n => n !== undefined && n !== "");
    if (names.includes("elsa")) {
      this.currentPointer = rotationPointers.ELSA;
    } else if (names.includes("chetan")) {
      this.currentPointer = rotationPointers.CHETAN;
    } else {
      this.currentPointer = rotationPointers.UNICORN;
    }
  }

  addNames() {
    if (this.namesInput !== "") {
      let i = 0;
      const radiusPx = 345;
      const names = this.namesInput.split("\n").filter(n => n !== undefined && n !== "");
      // console.log(names);
      const angle = (2 * Math.PI) / names.length;
      const initialAngle = Math.PI / 2;
      this.namesArray = [];
      names.forEach(n => {
        const xPos = radiusPx + radiusPx * Math.cos(initialAngle + i * angle);
        const yPos = radiusPx + radiusPx * Math.sin(initialAngle + i * angle);
        this.namesArray.push({ value: n, class: "wheel-stop js-wheel-stop", xPos, yPos });
        i++;
      });
      this.maybeSwitchPointer();
    }
  }

  spin() {
    this.spinSound.play();
    const winner = Math.floor(Math.random() * 553105243) % this.namesArray.length;

    const initialAngleDegrees = 90;
    const fullRotations = 6;
    const rotation =
      initialAngleDegrees +
      this.currentPointer.pointerAngle +
      (fullRotations * 360 * (++this.numberOfRuns)) +
      (winner * 360) / this.namesArray.length;
    console.log("or", rotation);
    document.getElementById("unicorn").style.transform = "rotate(" + rotation + "deg)";
    setTimeout(() => {
      this.showWinner(winner);
    }, 10);
  }

  showWinner(winner) {
    var i = 0;
    this.namesArray.forEach(function(name) {
      if (i == winner) {
        name.transform = "scale(5)";
      }
      i++;
    });
  }
}
