import { Directive, ElementRef, Input, SimpleChanges, Renderer2 } from '@angular/core';
import { MessageService } from '../services/message.service';

@Directive({
  selector: '[appProductPicture]'
})
export class ProductPictureDirective {
  
  @Input() imageFolder: string = null;
  @Input() imageSize: string = null;

  imageLoaded: boolean = false;
  imageFailed: boolean = false;
  imageSource: string = null;

  constructor(
      private el: ElementRef,
      private renderer: Renderer2,
      private messageService: MessageService
      )
  {
    this.setBackgroundImage("https://www.jinx.com/Content/responsive_themes/jinx/spring_2019/jinx_Spring_2019_Skull_anim.gif");
  }

  setBackgroundImage(url: string): void {
    this.imageSource = url;
    this.el.nativeElement.style.backgroundImage = url;
    this.renderer.setStyle(this.el.nativeElement, 'background-image', `url(${url}`);
     
    this.messageService.debug(url);
  }

  renderImage(): void {
    //this.messageService.debug("Product Image changing.");
    this.imageLoaded = false;
    this.imageFailed = false;
    
    if (this.imageFolder == null || this.imageSize == null) {
      //this.messageService.debug("Product Image failed.");
      this.imageFailed = true;
      this.imageLoaded = false;
    }
    else {
      var url = `${this.imageFolder}${this.imageSize}.jpg`;
      var productImage = new Image();
      productImage.src = url;

      productImage.onerror = () => {
        //this.messageService.debug("Product Image does not exist: " + url);
        this.imageFailed = true;
        this.imageLoaded = false;
      }
      
      productImage.onload = () => {
        //this.messageService.debug("Product Image loaded.");
        this.setBackgroundImage(url);
        
        this.imageLoaded = true;
        this.imageFailed = false;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Start loading a new image
    this.renderImage();
  }
}
