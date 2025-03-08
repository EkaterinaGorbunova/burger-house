import {Component, HostListener } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import { StripeService } from './stripe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  currency = "$CAD";
  loaderShowed = true;
  loader =  true;

  orderImageStyle: any;
  mainImageStyle: any;

  form = this.fb.group({
    order: ["", Validators.required],
    name: ["", Validators.required],
    phone: ["", Validators.required],
  });

  productsData = [
    {
      image: "1.png",
      title: "Burger Cheddar & Bacon",
      text: "Crispy beef cutlet, bun, tomato, Cheddar cheese, bacon, red onion, iceberg lettuce, mayonnaise, ketchup, cheese sauce",
      price: 8,
      basePrice: 8,
      grams: 360
    },
    {
      image: "2.png",
      title: "BBQ Bacon and Chicken",
      text: "Brioche bun with sesame seeds, chicken cutlet, cheddar cheese, tomato, pickled cucumber, onion, bacon, BBQ sauce",
      price: 7,
      basePrice: 7,
      grams: 390
    },
    {
      image: "3.png",
      title: "Double Beef Burger",
      text: "Two beef patties, cheddar cheese, romaine lettuce, pickles, fresh tomato, bacon, red onion, burger sauce, mustard",
      price: 10,
      basePrice: 10,
      grams: 420
    },
    {
      image: "4.png",
      title: "Bavarian Burger",
      text: "Burger bun, beef patty, red onion, cheese, hunter sausage, barbecue sauce, cheese sauce, iceberg lettuce",
      price: 7,
      basePrice: 7,
      grams: 220
    },
    {
      image: "5.png",
      title: "Bacon Cheeseburger",
      text: "Burger bun, beef patty, bacon, tomato, pickled cucumber, cheese, cheese sauce, ketchup, greens",
      price: 8,
      basePrice: 8,
      grams: 220
    },
    {
      image: "6.png",
      title: "Indiana Burger",
      text: "Burger bun, chicken patty, bacon, egg, pickled cucumber, crispy onion, ketchup, cheese sauce, mustard, greens",
      price: 9,
      basePrice: 9,
      grams: 320
    },
    {
      image: "7.png",
      title: "Veggie Burger",
      text: "Burger bun, vegetarian patty, red onion, cheese, fresh tomato, barbecue sauce, cheese sauce, iceberg lettuce",
      price: 8,
      basePrice: 8,
      grams: 280
    },
    {
      image: "1.png",
      title: "Burger Cheddar & Bacon",
      text: "Crispy beef cutlet, bun, tomato, Cheddar cheese, bacon, red onion, iceberg lettuce, mayonnaise, ketchup, cheese sauce",
      price: 8,
      basePrice: 8,
      grams: 360
    },
    {
      image: "8.png",
      title: "Whiny Joe Burger",
      text: "Burger bun, beef patty, bacon, tomato, pickled cucumber, red onion, cheese, jalapeño peppers, ketchup, greens",
      price: 7,
      basePrice: 7,
      grams: 380
    },
    {
      image: "9.png",
      title: "Double Cheeseburger",
      text: "Burger bun, two beef patties, double cheddar cheese, pickles, crispy onions, ketchup, cheese sauce, mustard, greens",
      price: 11,
      basePrice: 11,
      grams: 400
    },
    {
      image: "10.png",
      title: "Fresh Burger",
      text: "Burger bun, beef patty, bacon, cheddar cheese, salami, barbecue sauce, cheese sauce, iceberg lettuce, fresh tomato",
      price: 9,
      basePrice: 9,
      grams: 300
    },
    {
      image: "11.png",
      title: "Zucchini Burger",
      text: "Burger bun, vegetarian chickpea patty, grilled zucchini, tomato, pickled cucumber, cheese, mustard sauce, ketchup, greens",
      price: 8,
      basePrice: 8,
      grams: 320
    },
  ];

  // productsData: any;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
  ) {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.orderImageStyle = {transform: 'translate(-' + ((e.clientX * 0.3) / 8) + 'px,-' + ((e.clientY * 0.3) / 8) + 'px)'};
    this.mainImageStyle = {transform: 'translate(-' + ((e.clientX * 0.3) / 8) + 'px,-' + ((e.clientY * 0.3) / 8) + 'px)'};
  }

  ngOnInit() {
    setTimeout(() => {
      this.loaderShowed = false;
    }, 3000);
    setTimeout(() => {
      this.loader = false;
    }, 4000);
    // this.appService.getData().subscribe(data => this.productsData = data);
  }

  scrollTo(target: HTMLElement, burger?: any) {
    target.scrollIntoView({behavior: "smooth"});
    if (burger) {
      this.form.patchValue({order: burger.title + ' (' + burger.price + ' ' + this.currency + ')'});
    }
  }

  // confirmOrder() {
  //   if (this.form.valid) {
  //     this.appService.sendOrder(this.form.value)
  //       .subscribe(
  //         {
  //           next: (response: any) => {
  //             alert(response.message)
  //             console.log("Thanks for ordering! We will contact you soon!");
  //             this.form.reset()
  //           },
  //           error: (response) => {
  //             alert(response.error.message);
  //           },
  //         }
  //       );
  //   }
  // }
  // confirmOrder() {
  //   if (this.form.valid) {
  //     alert("Thanks for ordering! We will contact you soon!")
  //     this.form.reset()
  //   }
  // }

  async confirmOrder() {
    if (this.form.valid) {
      try {
        const orderName = this.form.value.order as string;
        
        if (!orderName) {
          throw new Error('No order selected');
        }

        const selectedBurger = this.productsData.find(
          burger => orderName?.includes(burger.title)
        );

        // Check if burger was found
        if (!selectedBurger) {
          throw new Error('Selected burger not found');
        }
        
        await this.stripeService.createPaymentSession(this.form.value, selectedBurger, this.currency);
        // The user will be redirected to Stripe Checkout
      } catch (error) {
        alert('Payment failed. Please try again.');
        console.error(error);
      }
    }
  }

  changeCurrency() {

    let newCurrency = "$CAD";
    let coefficient = 1;

    // if (this.currency === "$") {
    //   newCurrency = "₽";
    //   coefficient = 92;
    // } else if (this.currency === "₽") {
    //   newCurrency = "BYN";
    //   coefficient = 3.3;
    // } else if (this.currency === "BYN") {
    //   newCurrency = "€";
    //   coefficient = 0.85;
    // } else if (this.currency === "€") {
    //   newCurrency = "¥";
    //   coefficient = 6.7;
    // } else if (this.currency === "¥") {
    //   newCurrency = "£";
    //   coefficient = 0.8;
    // }

    if (this.currency === "$CAD") {
      newCurrency = "$USD";
      coefficient = 0.725;
    } else if (this.currency === "$USD") {
      newCurrency = "€";
      coefficient = 0.6;
    }
    this.currency = newCurrency

    this.productsData.forEach((item: any) => {
      item.price = +(item.basePrice * coefficient).toFixed(0);
    })
  }
}
