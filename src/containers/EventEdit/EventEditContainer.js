import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { EventEdit } from 'components';
import * as eventActions from 'redux/modules/event';
import * as eventEditActions from 'redux/modules/eventEdit';

const { object, bool, string, func, number } = PropTypes;

const EventEditContainer = React.createClass({
  propTypes: {
    params: object.isRequired,
    fetchAndHandleEvent: func.isRequired,
    
    event: PropTypes.instanceOf(Map),
    eventHost: PropTypes.instanceOf(Map),
    isFetching: bool.isRequired,
    error: string.isRequired,
    updateTitle: func.isRequired,
    updateDescription: func.isRequired,
    updateAddress: func.isRequired,
    updatePrice: func.isRequired,
    updateStartDate: func.isRequired,
    updateEndDate: func.isRequired,
    updateCategory: func.isRequired,
    title: string.isRequired,
    description: string.isRequired,
    address: string.isRequired,
    price: number.isRequired,
    startDate: string.isRequired,
    endDate: string.isRequired,
    category: string.isRequired,
    handleUpdateEvent: func.isRequired,
    handleDeleteEvent: func.isRequired,

    titleError: string.isRequired,
    warnTitleError: func.isRequired,
    descriptionError: string.isRequired,
    warnDescriptionError: func.isRequired,
    addressError: string.isRequired,
    warnAddressError: func.isRequired,
    startDateError: string.isRequired,
    warnStartDateError: func.isRequired,
    endDateError: string.isRequired,
    warnEndDateError: func.isRequired
  },

  componentDidMount () {
    if (this.props.event.size === 0) {
      this.props.fetchAndHandleEvent(this.props.params.id);
    }
  },

  render () {
    return <EventEdit
            event={ this.props.event }
            eventHost={ this.props.eventHost }
            isFetching={ this.props.isFetching }
            error={ this.props.error }
            updateTitle={ this.props.updateTitle }
            updateDescription={ this.props.updateDescription }
            updateAddress={ this.props.updateAddress }
            updatePrice={ this.props.updatePrice }
            updateStartDate={ this.props.updateStartDate }
            updateEndDate={ this.props.updateEndDate }
            updateCategory={ this.props.updateCategory }
            title={ this.props.title }
            description={ this.props.description }
            address={ this.props.address }
            price={ this.props.price }
            startDate={ this.props.startDate }
            endDate={ this.props.endDate }
            category={ this.props.category }
            handleUpdateEvent={ this.props.handleUpdateEvent }
            handleDeleteEvent={ this.props.handleDeleteEvent }
            
            titleError={ this.props.titleError }
            warnTitleError={ this.props.warnTitleError } 
            descriptionError={ this.props.descriptionError }
            warnDescriptionError={ this.props.warnDescriptionError } 
            addressError={ this.props.addressError }
            warnAddressError={ this.props.warnAddressError }
            startDateError={ this.props.startDateError }
            warnStartDateError={ this.props.warnStartDateError }
            endDateError={ this.props.endDateError }
            warnEndDateError={ this.props.warnEndDateError } />;
  }
});

function mapStateToProps ({ event, eventEdit }) {
  return {
    event: event.get('event'),
    eventHost: event.get('eventHost'),
    isFetching: event.get('isFetching'),
    error: event.get('error'),
    title: eventEdit.get('title'),
    description: eventEdit.get('description'),
    address: eventEdit.get('address'),
    price: eventEdit.get('price'),
    startDate: eventEdit.get('startDate'),
    endDate: eventEdit.get('endDate'),
    category: eventEdit.get('category'),
    titleError: eventEdit.get('titleError'),
    descriptionError: eventEdit.get('descriptionError'),
    addressError: eventEdit.get('addressError'),
    startDateError: eventEdit.get('startDateError'),
    endDateError: eventEdit.get('endDateError')
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...eventActions,
    ...eventEditActions
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventEditContainer);
