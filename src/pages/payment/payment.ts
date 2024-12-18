
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilProvider } from "../../providers/util/util";
import { User } from "../../providers";
import { Storage } from "@ionic/storage";
import { App } from "ionic-angular/index";
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { Stripe } from '@ionic-native/stripe';
import { ModalController } from "ionic-angular/index";
import { FirebaseProvider } from "../../providers/firebase/firebase";

// declare var Stripe;
declare var paypal: any;
@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  testKey = 'pk_test_51I7dXhFKbJ2V93hONh95WGaG8kNN7pdLVErafS8Alq0citxqsou761Q3QgE9RKwGiB0aPYyCVO3sAebQmnWbpiUo00kKrzVVeU'
  // stripe = Stripe(this.testKey);
  card: any;
  isenabled:boolean = true;
  paymentAmount: any = '10000';
  payPalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'ASgluWO02SKmOF_-g_BFXlAo4QsORovie0BMpQ3X3rGYQcwBT2U2ZCBCzBa7aR8RYW-o3bcEqNel5PNs',
    },
    commit: false,
    payment: (data, actions) => {
      console.log("data is", data, actions);
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.paymentAmount, currency: 'INR' } }
          ]
        }
      });
    }
  }
  isPaypal: boolean = false;
  userData: any = '';
  bookingId: any = '';
  amount: any = '';
  payPalBtn: any = '';
  paymentData: any = '';
  cardNumber: any = '';
  validity: any = '';
  cvv: any = '';
  chargeId: any = '';
  saveData: any;
  cardChecked: any;

  constructor(public navCtrl: NavController,
    public user: User,
    public util: UtilProvider,
    public app: App,
    private payPal: PayPal,
    public fireDb: FirebaseProvider,
    private stripe: Stripe,
    public storage: Storage,
    public modal: ModalController,
    public navParams: NavParams) {
    this.bookingId = navParams.data.paymentData ? navParams.data.paymentData.booking_id : '';
    this.amount = navParams.data.paymentData ? navParams.data.paymentData.amount : '';
    this.paymentData = navParams.data.detail;
    this.getAllSavedCard();
    console.log(this.paymentData);
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
    })
  }

  ionViewDidLoad() {
    this.getUserData();
  }
  getUserData() {
    this.storage.get('userData').then(data => {
      this.userData = JSON.parse(data);
    })
  }

  // paypal() {
  //   if (this.payPalBtn){
  //   }else {
  //     console.log("paypal",paypal);
  //     this.payPalBtn = paypal.Buttons(this.payPalConfig).render('#paypal-button');
  //   }
  //   this.isPaypal = true;
  // }
  // Mukesh sir - AWtxst4d1DsZBHTSYyuy9tC2Kv2qzEDQdZMNeQhlOzrq4iqwHD09_iIjPpF3QNtlqMMOxOGruNtD3kQz
  // AXbwqN0EYIbOnPtIEwj8a39ZvNyUPZfkHrx5RMN84kmYOULhd1MSMUEUtDa3tm7HfqKBkIuzQ3_yln3N
  paypal() {
    this.isPaypal = true;
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'AebFADGd9V-8IuZ3K-1qG3fkae44VknWbh5PwiKFzUuQ-k4dib9sG0FBqJsDeCck2rKU7wuITDRo3GI3'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.paymentData.amount, 'HKD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((suu) => {
          console.log('PayPal payment success >>>', suu);
          this.stripPay(suu.response.id, '', '', "paypal");
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }

  cardPay() {
    this.isPaypal = false;
  }

  // payNow() {
  // }

  // setupStripePaypal() {
  //   // paypal.Buttons(this.payPalConfig).render('#paypal-button');
  //   let elements = this.stripe.elements();
  //   var style = {
  //     base: {
  //       color: '#32325d',
  //       lineHeight: '24px',
  //       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
  //       fontSmoothing: 'antialiased',
  //       fontSize: '16px',
  //       '::placeholder': {
  //         color: '#aab7c4'
  //       }
  //     },
  //     invalid: {
  //       color: '#fa755a',
  //       iconColor: '#fa755a'
  //     }
  //   };

  //   this.card = elements.create('card', { style: style });

  //   this.card.mount('#card-element');

  //   this.card.addEventListener('change', event => {
  //     var displayError = document.getElementById('card-errors');
  //     if (event.error) {
  //       displayError.textContent = event.error.message;
  //     } else {
  //       displayError.textContent = '';
  //     }
  //   });

  //   var form = document.getElementById('payment-form');
  //   form.addEventListener('submit', event => {
  //     event.preventDefault();
  //     this.util.presentLoader('');
  //     this.stripe.createToken(this.card).then(result => {
  //       console.log('token >>>', JSON.stringify(result));
  //       let data: any = result;
  //       let last4 = data.token.card.last4;
  //       let cardName = data.token.card.brand;
  //       this.stripPay(data.token.id, last4, cardName, "stripe");
  //     }).catch(err => {
  //       console.error(err);
  //       this.util.dismissLoader();
  //     })
  //   });
  // }

  stripPay(token, last4, cardName, method) {
    if (this.paymentData.booking_type == 'Equipment') {
      let data = {
        'equipment_id': this.paymentData.equipment_id,
        'amount': this.paymentData.amount,
        "token": token,
        "payment_type": method,
        "token_type": "",
        "save_card": "",
        "card_number": last4
      }
      if (this.chargeId != '') {
        localStorage.setItem('cardToken', token);
        data.token = this.chargeId;
        data.token_type = "1";
      } else if (!this.cardChecked) {
        localStorage.setItem('cardToken', token);
        data.token = token;
        data.token_type = "0";
        data.save_card = "";
      } else {
        data.token = token;
        data.token_type = "0";
        data.save_card = "1";
        localStorage.setItem('cardToken', token);
      }
      console.log(data)
      this.user.BookEquipment(data, this.userData.Authorization).subscribe(res => {
        let response: any = res;
        console.log(response);
        if (response.status) {
          //  this.navCtrl.push('TicketPage',{type:'equipment'});
          this.util.dismissLoader();
          this.navCtrl.push('TicketPage', { detail: res });
          this.util.presentAlert('', response.message);
        } else {
          this.util.presentAlert('', response.message);
        }
        setTimeout(() => {
          this.util.dismissLoader();
        }, 500);
      }, error => {
        console.error(error);
        this.util.dismissLoader();
      });
    }
    if (this.paymentData.booking_type == 'Event') {
      let data = {
        "event_id": this.paymentData.event_id,
        "event_type": "0",
        "amount": this.paymentData.amount,
        "discount_code": this.paymentData.discount_code,
        "discount_value": this.paymentData.discount_value,
        "token": token,
        "no_of_ticket": this.paymentData.no_of_ticket,
        "payment_type": method,
        "token_type": "1",
        "save_card": "",
        "card_number": last4
      }
      if (this.chargeId != '') {
        localStorage.setItem('cardToken', token);
        data.token = this.chargeId;
        data.token_type = "1";
      }else if (!this.cardChecked) {
        localStorage.setItem('cardToken', token);
        data.token = token;
        data.token_type = "0";
        data.save_card = "";
      } else {
        data.token = token;
        data.token_type = "0";
        data.save_card = '1';
        localStorage.setItem('cardToken', token);
      }
      console.log(data)
      this.user.bookEvent(data, this.userData.Authorization).subscribe(res => {
        let response: any = res;
        console.log(response);
        if (response.status) {
          this.util.dismissLoader();
          this.navCtrl.push('TicketPage', { detail: res });
          this.util.presentAlert('', response.message);
        } else {
          this.util.presentAlert('', response.message);
        }
        setTimeout(() => {
          this.util.dismissLoader();
        }, 500);
      }, error => {
        console.error(error);
        this.util.dismissLoader();
      });
    }
    if (this.paymentData.booking_type == 'Space') {
      let data = {
        'sapce_id': this.paymentData.sapce_id,
        'amount': this.paymentData.amount,
        "token": token,
        "payment_type": method,
        "token_type": "1",
        "save_card": "",
        "card_number": last4
      }
      if (this.chargeId != '') {
        localStorage.setItem('cardToken', token);
        data.token = this.chargeId;
        data.token_type = "1";
      } else if (!this.cardChecked) {
        localStorage.setItem('cardToken', token);
        data.token = token;
        data.token_type = "0";
        data.save_card = "";
      } else {
        data.token = token;
        data.token_type = "0";
        data.save_card = '1';
        localStorage.setItem('cardToken', token);
      }
      this.user.bookSpace(data, this.userData.Authorization).subscribe(res => {
        let response: any = res;
        console.log('this.userData.Authorization', this.userData.Authorization)
        console.log('data', data)
        console.log(response);
        if (response.status) {
          this.navCtrl.push('TicketPage', { detail: res });
          this.util.presentAlert('', response.message);
        } else {
          this.util.presentAlert('', response.message);
        }
        setTimeout(() => {
          this.util.dismissLoader();
        }, 500);
      }, error => {
        console.error(error);
        this.util.dismissLoader();
      });
      // this.navCtrl.push('TicketPage',{type:'space'});
    }
    if (this.paymentData.booking_type == 'Project') {
      let data = {
        "project_id": this.paymentData.project_id,
        'amount': this.paymentData.amount,
        "token": token,
        "payment_type": method,
        "token_type": "",
        "save_card": "",
        "user_id": this.paymentData.user_id,
        "card_number": last4
      }
      if (this.chargeId != '') {
        localStorage.setItem('cardToken', token);
        data.token = this.chargeId;
        data.token_type = "1";
      } else if (!this.cardChecked) {
        localStorage.setItem('cardToken', token);
        data.token = token;
        data.token_type = "1";
        data.save_card = "";
      } else {
        data.token = token;
        data.token_type = "0";
        data.save_card = "1";
        localStorage.setItem('cardToken', token);
      }
      console.log(data)
      this.user.BookingProject(data, this.userData.Authorization).subscribe(res => {
        let response: any = res;
        console.log('BookingProject',response);
        if (response.status) {
          let userData = {
            date_of_join: new Date().getTime(),
            id: this.paymentData.user_id,
            image: this.paymentData.profile_pic,
            name: this.paymentData.first_name !== '' ? this.paymentData.first_name + ' ' + this.paymentData.last_name : this.paymentData.email,
            roomId: 'StageChatRoom_' + (Math.floor(Math.random() * 10000) + 1)
          }
          console.log('BookingProject',userData);
          this.fireDb.addUser(userData, this.userData.id);
          this.navCtrl.push('InboxPage');
          this.util.dismissLoader();
          // this.navCtrl.push('TicketPage', { detail: res });
          this.util.presentAlert('', response.message);
        } else {
          this.util.presentAlert('', response.message);
        }
        setTimeout(() => {
          this.util.dismissLoader();
        }, 500);
      }, error => {
        console.error(error);
        this.util.dismissLoader();
      });
    }
  }

  payNow() {
    console.log(this.cardChecked);
    if (this.cardNumber == '' || this.cardNumber == undefined) {
      this.util.presentToast('Enter card number');
    }
    else if (this.validity == '' || this.validity == undefined) {
      this.util.presentToast('Enter card validity');
    }
    else if (this.cvv == '' || this.cvv == undefined) {
      this.util.presentToast('Enter card cvv');
    } else {
      this.isenabled = false;
      this.util.presentLoader('');
      this.stripe.setPublishableKey(this.testKey);
      var splitdata = this.validity.split('-')
      let cardData = {
        number: this.cardNumber,
        expMonth: splitdata[1],
        expYear: splitdata[0],
        cvc: this.cvv
      };
      this.stripe.createCardToken(cardData)
        .then(token => {
          this.util.dismissLoader();
          console.log(token);
          this.stripPay(token.id, this.cardNumber, token.card.brand, "stripe");
        })
        .catch(error => {
          console.error(error);
          this.util.presentAlert('', error);
          this.util.dismissLoader();
        });
    }
  }
  getAllSavedCard() {
    this.storage.get('userData').then(data => {
      this.userData = JSON.parse(data);
      console.log('saved card this.userData.Authorization', this.userData.Authorization);
      this.user.getSaveCardList(this.userData.Authorization).subscribe(res => {
        let resp: any = res;
        this.saveData = resp.status;
        console.log('saved card data', resp);
        if (resp.status) {
          setTimeout(() => {
            this.util.dismissLoader();
          }, 500)
        } else {
          this.util.dismissLoader();
        }
      }, error => {
        console.error(error);
        this.util.dismissLoader();
      })
    })
  }
  storedCard() {
    let modal = this.modal.create('StoredCardPage');
    modal.present();
    modal.onDidDismiss(data => {
      this.cardNumber = data.card_number;
      this.chargeId = data.stripe_charge_id;
      // this.navCtrl.popToRoot();
      this.stripPay('', '', '', "stripe");
    })
  }
}
