import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
/**
 * Generated class for the PaypalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paypal',
  templateUrl: 'paypal.html',
})
export class PaypalPage {
  paymentdata : any;
  paymentdetails: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private payPal: PayPal) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaypalPage');
  }
workOnPay(){
  this.payPal.init({
    PayPalEnvironmentProduction: 'AXewrXdFQt5XZF-f9wMMZPDZWPImm1lb7s4VfzDR0_DHTykKU0IMC6yYQKMu48eL0Ysjo76TAy4AP0Rb',
    PayPalEnvironmentSandbox: 'Ac7gJmlZi3gGt1ktSQWw7LdHOqrIIVnN0QbNGBjSNhsbuokuxhQmlIoZLz9ykVxOX-rXxfzQ2dIc5a7e'
  }).then(() => {
    // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
    this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
      // Only needed if you get an "Internal Service Error" after PayPal login!
      //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
    })).then(() => {
      let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
      this.payPal.renderSinglePaymentUI(payment).then((res) => {
        console.log(res);
        // Successfully paid
  
        // Example sandbox response
        //
        // {
        //   "client": {
        //     "environment": "sandbox",
        //     "product_name": "PayPal iOS SDK",
        //     "paypal_sdk_version": "2.16.0",
        //     "platform": "iOS"
        //   },
        //   "response_type": "payment",
        //   "response": {
        //     "id": "PAY-1AB23456CD789012EF34GHIJ",
        //     "state": "approved",
        //     "create_time": "2016-10-03T13:33:33Z",
        //     "intent": "sale"
        //   }
        // }
      }, (err) => {
        console.error(err);
        
        // Error or render dialog closed without being successful
      });
    }, (err) => {
      console.error("Error in configuration",err);
      // Error in configuration
    });
  }, (err) => {
    console.error("Error in initialization",err);
    // Error in initialization, maybe PayPal isn't supported or something else
  });
}
initiatePaypal(){
  this.payPal.init({
          "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
          "PayPalEnvironmentSandbox": "AWtxst4d1DsZBHTSYyuy9tC2Kv2qzEDQdZMNeQhlOzrq4iqwHD09_iIjPpF3QNtlqMMOxOGruNtD3kQz"
          })
      .then(onSuccess => {
          console.log("init success")
          this.initiatePayment();
      })
      .catch(onError => {
          console.log("init failed", Error)
      });
  }
  
  
  initiatePayment(){
  
      this.paymentdata = new PayPalPayment("3.33","USD", "MMS tickets", "MMS sale");
  
      this.payPal.renderSinglePaymentUI(this.paymentdata)
      .then(onSuccess => {
           console.log('OnSuccess Render: ' + JSON.stringify(onSuccess));
           alert('OnSuccess Render: ' + JSON.stringify(onSuccess));
         })
      .catch(onError=> {
         console.log('onError Render: ' + JSON.stringify(onError));
         alert('onError Render: ' + JSON.stringify(onError));
           });
  }
}
