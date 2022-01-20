

const Card = ({item}) =>{    
    return (
      <div className="card-container">
        <img src={item.urls.regular} alt={item.alt_description} />
        <div className="image-info">
          <div className="inner-container">
            <div className="text-info">
              <h4>{`${item.user.first_name} ${item.user.last_name||""}`}</h4>
              <p>{item.user.social.instagram_username||""}</p>
            </div>
            <div className="img-info-container"><img src={item.user.profile_image.medium} alt="profile-pic" /></div>
          </div>
        </div>
      </div>
    )
}

export default Card