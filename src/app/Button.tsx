import React, { Component } from "react";

// Props için bir tür belirtin
interface ButtonProps {
  svg: string; // SVG dosyasının URL'ini temsil eder
  alt: string; // Resim için alternatif metin
  name: string; // Düğmenin göstereceği metin
}

class Button extends Component<ButtonProps> { // ButtonProps türünü burada kullanın
  constructor(props: ButtonProps) { // props parametresi için türü burada da belirtin
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="flex w-full border border-transparent hover:border-white text-white">
        <div className="flex-none w-1/3">
          <img src={this.props.svg} alt={this.props.alt} />
        </div>
        <div className="flex-grow w-2/3">
          {this.props.name}
        </div>
      </div>
    );
  }
}

export default Button;
