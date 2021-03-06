/**
 * npm modules
 */
import React from 'react';
import PropTypes from 'prop-types'
import { compose } from 'recompose';
import invariant from 'invariant';

/**
 * local moduleds
 */
import Overlay from '../Overlay'
import pick from '../../utils/pick';
import { withNavermaps, bridgeEventHandlers } from '../../hocs';

/**
 * 
 * @param {*} props 
 */
class GroundOverlay extends React.Component {
  componentWillUnmount() {
    if (this.overlay) this.overlay.setMap(null)
  }

  createGroundOverlay() {
    const { 
      navermaps,
      map,
      bounds,
      url,
      clickable,
      registerEventInstance,
    } = this.props;

    const groundOverlay = new navermaps.GroundOverlay(url, bounds, {
      map,
      clickable,
    });

    registerEventInstance(groundOverlay);
    return groundOverlay;
  }

  updateGroundOverlay(groundOverlay) {
    const { opacity } = this.props;

    groundOverlay.setOpacity(opacity);
  }

  render() {
    if (!this.overlay) {
      this.overlay = this.createGroundOverlay();
    }

    this.updateGroundOverlay(this.overlay);

    return null;
  }
}

GroundOverlay.defaultProps = {
  events: [
    'click',
    'dblclick',
  ],
}

GroundOverlay.propTypes = {
  events: PropTypes.arrayOf(PropTypes.string),
  bounds: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  clickable: PropTypes.bool,
  opacity: PropTypes.number,
}

export default compose(
  withNavermaps,
  bridgeEventHandlers,
)(GroundOverlay)