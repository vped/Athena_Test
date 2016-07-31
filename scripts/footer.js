/**
 * Created by ved on 31/7/16.
 */

import React, {Component} from 'react';

export default class Header extends Component {


    constructor() {
        super();
    }


    render() {
        return (
            <div id="footer">
                <div className="container">
                    <p className="footer">Example courtesy <a href="">Ved  </a> <a href="http://stackoverflow.com/users/3265777/ved">Prakash</a></p>
                </div>
            </div>

        );
    }
}