import React, {Component} from 'react';
import PropTypes from "prop-types";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import EditIcon from 'material-ui/svg-icons/maps/edit-location';
import DeleteIcon from 'material-ui/svg-icons/communication/location-off';
import {Link} from 'react-router-dom'
import PROPERTY_NAMES from '../../util/addressPropertyName';
import {tableRowStyle, tableHeaderStyle} from '../../style';
import { connect } from 'react-redux';
import {deleteAddress} from '../../action';


const AddressTable = (props) => {

    let tableRows = props.addresses.map((address) => {
        return (
            <TableRow key={address.key}>
                <TableRowColumn style={{...tableRowStyle, width: '250px'}}>{address.street}</TableRowColumn>
                <TableRowColumn style={tableRowStyle}>{address.ward}</TableRowColumn>
                <TableRowColumn style={tableRowStyle}>{address.district}</TableRowColumn>
                <TableRowColumn style={tableRowStyle}>{address.city}</TableRowColumn>
                <TableRowColumn style={tableRowStyle}>{address.country}</TableRowColumn>
                <TableRowColumn>
                    <FlatButton label="Edit" primary containerElement={<Link to={`/address/edit/${address.createdBy}/${address.key}`}/>}
                                icon={<EditIcon/>}/>
                </TableRowColumn>
                <TableRowColumn>
                    <FlatButton label="Delete" secondary containerElement={<span/>} icon={<DeleteIcon/>}
                                onTouchTap={() => {props.handleDelete(address.key)}}/>
                </TableRowColumn>
            </TableRow>
        );
    });

    return (
        <Table selectable={false}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                    <TableHeaderColumn style={{...tableHeaderStyle, width: '250px'}}>{PROPERTY_NAMES.STREET}</TableHeaderColumn>
                    <TableHeaderColumn style={tableHeaderStyle}>{PROPERTY_NAMES.WARD}</TableHeaderColumn>
                    <TableHeaderColumn style={tableHeaderStyle}>{PROPERTY_NAMES.DISTRICT}</TableHeaderColumn>
                    <TableHeaderColumn style={tableHeaderStyle}>{PROPERTY_NAMES.CITY}</TableHeaderColumn>
                    <TableHeaderColumn style={tableHeaderStyle}>{PROPERTY_NAMES.COUNTRY}</TableHeaderColumn>
                    <TableHeaderColumn />
                    <TableHeaderColumn />
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {tableRows}
            </TableBody>
        </Table>
    )
};

AddressTable.propTypes = {
    addresses: PropTypes.array.isRequired
}

export default connect(
    ({addresses}) => ({addresses}),
    (dispatch) => {
        return {
            handleDelete: (key) => {dispatch(deleteAddress(key))}
        };
    }
)(AddressTable);