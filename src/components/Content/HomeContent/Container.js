// CORE LIBS
import { connect } from 'react-redux';

// ACTIONS
import { showNewProjectModal } from '../../../store/ui/actions';

// COMPONENTS
import HomeContent from './index';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    showNewProjectModal: () => dispatch(showNewProjectModal()),
  };
};

// EXPORT
export default connect(null, mapDispatchToProps)(HomeContent);
