// src/components/Icon/Icon.jsx

import Add from '../../assets/images/add.svg';
import Edit from '../../assets/images/edit.svg';
import Fitness from '../../assets/images/fitness.svg';
import Like from '../../assets/images/like.svg';
import Liked from '../../assets/images/liked.svg';
import Hobbies from '../../assets/images/hobbies.svg';
import Career from '../../assets/images/career.svg';
import Trash from '../../assets/images/trash.svg';
import Relationships from '../../assets/images/relationships.svg';
import Sports from '../../assets/images/sports2.svg';
import Create from '../../assets/images/create.svg';
import Comments from '../../assets/images/comments.svg';
import Calendar from '../../assets/images/calendar.svg';
import Travel from '../../assets/images/travel.svg';

const Icon = ({ category }) => {
  const icons = {
    Add: Add,
    Fitness: Fitness,
    Like: Like,
    Edit: Edit,
    Hobbies: Hobbies,
    Career: Career,
    Liked: Liked,
    Trash: Trash,
    Relationships: Relationships,
    Sports: Sports,
    Create: Create,
    Calendar: Calendar,
    Comments: Comments,
    Travel: Travel,
  };

  return (
    <img
      src={icons[category]}
      alt={`A ${category} icon.`}
      id={category.toLowerCase()}
      className='icon'
    />
  );
};

export default Icon;
