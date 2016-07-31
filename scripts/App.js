import React, {Component} from 'react';
import Header from './header';
import Bill from './bill';
import Footer from './footer';


export default class App extends Component {
  
  
  constructor() {
    super();
    this.state = {
          items:[{}],
          customerTypeDiscount:0,
          totalBilledProduct:[],
          billTotal:0,
          count:0
    };

      this.userType = [{type:"Employee",dis:"30"},{type:"Affiliate",dis:"12"}];
  }


    customerFilter(event) {
        let customer =  event.target.value;
        this.userType.forEach((val)=>{
            if( customer && val.type == customer){
                this.setState({
                    customerTypeDiscount:val.dis
                },()=>{
                    this.bill();
                })
            }
            if(!customer){
                this.setState({
                    customerTypeDiscount:""
                })
            }
        })
    };

    bill(data){
        let product  = this.state.totalBilledProduct,
            total = 0,count =0;
        if(data){
            product.push(data);
            count = product.length;
            product.forEach((val)=>{
                console.log(val.price);
                total = total + Number(val.price);
            });
            total = total - (total)*(this.state.customerTypeDiscount)/100;

            this.setState({
                totalBilledProduct:product,
                count:count,
                billTotal:total
            })
        } else {
            count = product.length;
            this.state.totalBilledProduct.forEach((val)=>{
                console.log(val.price);
                total = total + Number(val.price);
            });
            total = total - (total)*(this.state.customerTypeDiscount)/100;

            this.setState({
                totalBilledProduct:product,
                count:count,
                billTotal:total
            })
        }

        // console.log(data,"ddddd");
    }
    

    addMore(){
        let item = this.state.items;
        item.push({});
        this.setState({
            items:item
        })
    }


  render() {
    return (
        <div>
            <Header></Header>
            <div className="container billing-section">
                <div className="row">

                    <div className="form-group col-xs-4">
                        <select className="form-control" onChange={this.customerFilter.bind(this)}>
                            <option value=""> Select Customer</option>
                            {
                                this.userType && this.userType.map(function(val,index){
                                    return <option key={index}>{val.type}</option>
                                })
                            }
                        </select>

                    </div>

                    <div className="form-group col-xs-6">
                        <input disabled={this.state.customerTypeDiscount?false:true} type="text" className="form-control"  placeholder="Customer Name"/>
                    </div>
                    <div className="form-group col-xs-2">
                        <input type="text" readOnly="readonly" className="form-control change-backgroung" value={this.state.customerTypeDiscount+"%"} placeholder="Discount"/>
                    </div>
                </div>
                <h2>Enter Billing Items</h2>

                <div>
                    {
                        this.state.items.map((val,index)=>{
                            return   <Bill addBill={this.bill.bind(this)} key={index}/>
                        })
                    }

                </div>
                <div className="form-group col-xs-2">
                    <button type="button" className="btn btn-default" onClick={this.addMore.bind(this)}>Add</button>
                </div>
                <hr/>
                <div className="form-group col-xs-3">
                    <label htmlFor="totalDiscount">Customer Discount</label>
                    <input id="totalDiscount" type="text" readOnly="readonly" className="form-control change-backgroung" value={this.state.customerTypeDiscount
                    +"%"} placeholder="Customer Discount"/>
                </div>
                <div className="form-group col-xs-3">
                    <label htmlFor="total">Prodcut Count</label>
                    <input id="total" type="text" readOnly="readonly" className="form-control change-backgroung" value={this.state.count} placeholder="Product Discount"/>
                </div>
                <div className="form-group col-xs-4">
                    <label htmlFor="grand_total">Grand Total</label>
                    <input id="grand_total" type="text" readOnly="readonly" className="form-control change-backgroung" value={this.state.billTotal} placeholder="Grand Total"/>
                </div>
            </div>
            <Footer/>
          </div>
    );
  }
}
