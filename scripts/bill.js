/**
 * Created by ved on 31/7/16.
 */





import React, {Component} from 'react';
import lodash from 'lodash';

export default class Bill extends Component {


    constructor() {
        super();
        this.state = {
            items:[{}],
            productTypeDiscount:null,
            typeOfProduct:null,
            productPrice:null,
            discountedPrice:null

        };

        this.products = [
            {
                "id": "0",
                "name":"Rice",
                "category": "Grocery",
                "price": "110.0",
                "discount":"5"
            },
            {
                "id": "1",
                "name":"Soap",
                "category": "Grocery",
                "price": "100.0",
                "discount":"5"
            },
            {
                "id": "2",
                "name":"Oil",
                "category": "Grocery",
                "price": "90.0",
                "discount":"5%"
            },
            {
                "id": "3",
                "name":"Sugar",
                "category": "Grocery",
                "price": "80.0",
                "discount":"5"
            },
            {
                "id": "4",
                "name":"Salt",
                "category": "Grocery",
                "price": "70.0",
                "discount":"5"
            },
            {
                "id": "5",
                "name":"Lays",
                "category": "Grocery",
                "price": "60.0",
                "discount":"5"
            },
            {
                "id": "6",
                "name":"Nokia",
                "category": "Mobile",
                "price": "50.0",
                "discount":"0"
            },
            {
                "id": "7",
                "name":"Samsung",
                "category": "Mobile",
                "price": "40.0",
                "discount":"0"
            },
            {
                "id": "8",
                "name":"LG",
                "category": "Mobile",
                "price": "30.0",
                "discount":"0"
            },
            {
                "id": "9",
                "name":"MOTO",
                "category": "Mobile",
                "price": "20.0",
                "discount":"0"
            },
            {
                "id": "10",
                "name":"LAVA",
                "category": "Mobile",
                "price": "10.0",
                "discount":"0"
            }
        ];

        this.userType = [{type:"Employee",dis:"30%"},{type:"Affiliate",dis:"12%"},{type:"General",dis:"0%"}];
        this.productType = [{type:"Mobile",dis:"0%"},{type:"Grocery",dis:"5%"}];
    }



    productFilter(event){
        //console.log(event.target.value,"event");
        let customer =  event.target.value;
        this.productType.forEach((val)=>{
            if(val.type == customer){
                this.setState({
                    productTypeDiscount:val.dis,
                    typeOfProduct:val.type
                })
            }
        })
    }

    calculateBill(event){
        let product =  event.target.value;
        this.products.forEach((val)=>{
            if(val.name == product){
                let obj = lodash.cloneDeep(val);
                obj.price = Number(obj.price) - (Number(obj.price) * Number(obj.discount)/100);
                this.setState({
                    productPrice:Number(val.price),
                    discountedPrice: obj.price
                },()=>{

                    this.props.addBill(obj);
                })
            }

        })
    }


    render() {

        return (

                <div className="row">
                    {
                        this.state.items.map((val,index)=>{
                            return (
                                <div key={index}>
                                    <div className="form-group col-xs-3">
                                        <select className="form-control" onChange={this.productFilter.bind(this)}>
                                            <option  value="">Product Type</option>
                                            {

                                                this.productType && this.productType.map(function(val,ind){
                                                    return <option key={ind}>{val.type}</option>
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="form-group col-xs-3">
                                        <select disabled={this.state.typeOfProduct?false:true} className="form-control" onChange={this.calculateBill.bind(this)}>
                                            <option  value="">Select Product</option>
                                            {
                                                this.products && this.products.map((val,i)=>{
                                                    if(val.category == this.state.typeOfProduct){
                                                        return <option key={i} >{val.name}</option>
                                                    }

                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="form-group col-xs-2">
                                        <input type="text" readOnly="readonly" className="form-control change-backgroung" value={this.state.productTypeDiscount} placeholder="Discount"/>
                                    </div>
                                    <div className="form-group col-xs-2">
                                        <input type="text" readOnly="readonly" className="form-control change-backgroung" value={this.state.productPrice} placeholder="Price"/>
                                    </div>
                                    <div className="form-group col-xs-2">
                                        <input type="text" readOnly="readonly" className="form-control change-backgroung" value={this.state.discountedPrice} placeholder="Discount Price"/>
                                    </div>
                                </div>
                            )
                        })
                    }

            </div>
        );
    }
}











