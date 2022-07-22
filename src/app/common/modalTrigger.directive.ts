import { Directive, ElementRef, Inject, Input, OnInit } from "@angular/core";
import { JQ_TOKEN } from "./jQuery.service";

@Directive({
  selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit {
  private el: HTMLElement;
  @Input('modal-trigger') modalId!: string;
  
  constructor(el: ElementRef, @Inject(JQ_TOKEN) private $: any) {
    this.el = el.nativeElement;
  }

  ngOnInit(): void {
    this.el.addEventListener('click', (e: Event) => {
      this.$(`#${this.modalId}`).modal({})
    })
  }
}
