import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

import ListingItem from "../components/ListingItem";
import Spinner from "../components/Spinner";

function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  useEffect(() => {
    fetchListings();
    //eslint-disable-next-line
  }, []);

  const onFetchMoreListings = () => {
    fetchListings(true);
  };

  const fetchListings = async (fetchMore = false) => {
    try {
      // Get reference
      const listingsRef = collection(db, "listings");

      // Create a Query
      let q;
      if (fetchMore) {
        q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          startAfter(lastFetchedListing),
          limit(10)
        );
      } else {
        q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );
      }

      // Execute the query
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      const listings = [];

      querySnap.forEach((doc) => {
        listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      if (fetchMore) {
        setListings((prevState) => [...prevState, ...listings]);
      } else {
        setListings(listings);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Could not fetch listing, Please contact the team");
    }
  };

  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </main>
          {lastFetchedListing && (
            <p className="loadMore" onClick={onFetchMoreListings}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>There are no Current Offers</p>
      )}
    </div>
  );
}

export default Offers;
