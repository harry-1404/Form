import { useEffect, useState } from "react";
import axios from "axios";

function Input() {
  const [data, setData] = useState([]);
  const [getCountry, setCtry] = useState();
  const [getState, setstate] = useState([]);
  const [seletedState, setSelectState] = useState();

  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const ctry = [...new Set(data.map((item) => item.country))];
  ctry.sort();

  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [zc, setZc] = useState();
  const [message, setMessage] = useState();

  const handleCountry = (e) => {
    setCountry(e.target.value);
    let states = data.filter((states) => states.country === e.target.value);
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();
    setstate(states);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/form", {
        fname,
        lname,
        email,
        phone,
        address,
        address2,
        state,
        country,
        zc,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  const emailValidation = (e) => {
    setEmail(e.target.value);
    const regEx = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email.match(regEx)) {
      setMessage("Email is valid");
    } else if (!regEx.test(email)) {
      setMessage("Email is not Valid");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-200 ">
      <div className="bg-white p-3 rounded w-25 m-5">
        <h2>Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 ">
            <label htmlFor="email">
              <strong>First Name</strong>
            </label>
            <input
              type="text"
              placeholder="First Name"
              // autoComplete="off"
              name="name"
              className="form-control rounded-8"
              minLength={5}
              onChange={(e) => setFname(e.target.value)}
              required
            />
            <p>Minimum 5 charater</p>
          </div>
          <div className="mb-3 ">
            <label htmlFor="name">
              <strong>Last Name</strong>
            </label>
            <input
              type="text"
              placeholder="Last Name"
              // autoComplete="off"
              name="name"
              className="form-control rounded-8"
              minLength={5}
              onChange={(e) => setLname(e.target.value)}
              required
            />
            <p>Minimum 5 charater</p>
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              // autoComplete="off"
              name="name"
              className="form-control rounded-8"
              onChange={emailValidation}
              required
            />
            <p>{message}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="phone">
              <strong>Phone Number</strong>
            </label>
            <input
              type="number"
              placeholder="Phone number"
              // autoComplete="off"
              name="mob"
              className="form-control rounded-8"
              minLength={10}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Address 1</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              // autoComplete="off"
              name="name"
              className="form-control rounded-8"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Address 2 (optional)</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              // autoComplete="off"
              name="name"
              className="form-control rounded-8"
              onChange={(e) => setAddress2(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="country">
              <strong>Country</strong>
            </label>
            <select
              className="form-select rounded-8 "
              onChange={(e) => handleCountry(e)}
              required
            >
              {ctry.map((items) => (
                <option key={items} value={getCountry}>
                  {items}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="state">
              <strong>State</strong>
            </label>
            <select
              className="form-select rounded-8 "
              onChange={(e) => setState(e.target.value)}
              required
            >
              {getState.map((items) => (
                <option key={items} value={seletedState}>
                  {items}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="zip">
              <strong>Zip Code</strong>
            </label>
            <input
              type="number"
              placeholder="Zip Code"
              // autoComplete="off"
              name="Zip"
              className="form-control rounded-8"
              onChange={(e) => setZc(e.target.value)}
              required
            />
          </div>

          <div className="m-3"></div>
          <button type="submit" className="btn btn-success w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Input;
