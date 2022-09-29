import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function CreateListing() {
  const [geoLocationEnabled, setGeoLocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longiture: 0,
  });
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const watcher = onAuthStateChanged(auth, (user) => {
      if (user) {
        setformData({
          ...formData,
          userRef: user.uid,
        });
      } else {
        navigate("/sign-in");
      }
    });
    return watcher;
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return <div>CreateListing</div>;
}
