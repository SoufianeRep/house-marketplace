import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
import { ReactComponent as EditIcon } from "../assets/svg/editIcon.svg";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";
import { formatPrice } from "../helpers/formatPrice";

export default function ListingItem({ listing, id, onEdit, onDelete }) {
  return (
    <li className="categoryListing">
      <Link
        to={`/category/${listing.type}/${id}`}
        className="categoryListingLink"
      >
        <img
          src={listing.imgUrls[0]}
          alt={listing.name}
          className="categoryListingImg"
        />
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{listing.location}</p>
          <p className="categoryListingName">{listing.name}</p>
          <p className="categoryListingPrice">
            $
            {listing.offer
              ? formatPrice(listing.discountedPrice)
              : formatPrice(listing.regularPrice)}
            {listing.type === "rent" && " / Month"}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="bed icon" />
            <p className="categoryListingInfoText">
              {listing.bedrooms
                ? listing.bedrooms > 1
                  ? `${listing.bedrooms} Bedrooms`
                  : "1 Bedroom"
                : "Unknown"}
            </p>
            <img src={bathtubIcon} alt="bathtub icon" />
            <p className="categoryListingInfoText">
              {listing.bathrooms
                ? listing.bathrooms > 1
                  ? `${listing.bathrooms} Bathrooms`
                  : "1 Bathroom"
                : "Unknown"}
            </p>
          </div>
        </div>
      </Link>

      {onDelete && (
        <DeleteIcon
          className="removeIcon"
          fill="rgb(231, 76, 60)"
          onClick={() => onDelete(listing.id, listing.name)}
        />
      )}

      {onEdit && <EditIcon className="editIcon" onClick={() => onEdit(id)} />}
    </li>
  );
}
