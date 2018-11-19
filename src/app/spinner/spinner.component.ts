import { Component, OnInit } from "@angular/core";

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

  addNames() {
    if (this.namesInput !== "") {
      var i = 0;
      var radiusPx = 345;
      const names = this.namesInput.split("\n").filter(n => n !== undefined && n !== "");
      console.log(names);
      var angle = (2 * Math.PI) / names.length;
      var initialAngle = Math.PI / 2;
      this.namesArray = [];
      names.forEach(n => {
        const xPos = radiusPx + radiusPx * Math.cos(initialAngle + i * angle);
        const yPos = radiusPx + radiusPx * Math.sin(initialAngle + i * angle);
        this.namesArray.push({ value: n, class: "wheel-stop js-wheel-stop", xPos, yPos });
        i++;
      });
    }
  }

  spin() {
    this.spinSound.play();
    const winner = Math.floor(Math.random() * 553105243) % this.namesArray.length;

    const initialAngleDegrees = 90;
    const hornAngleDegrees = 56;
    const fullRotations = 6;
    const rotation =
      initialAngleDegrees +
      hornAngleDegrees +
      fullRotations * 360 +
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
