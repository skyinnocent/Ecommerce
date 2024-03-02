import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import axios from "axios";
function AdminDashBoard() {
  const [sellerArray, setSellerArray] = useState([]);
  const [displaySellers, setDisplaySellers] = useState([]);
  const [active, setActive] = useState("active");
  const [bigContainer, setBigContainer] = useState("small");
  const getSellers = async () => {
    try {
      const resSellers = await axios.get(
        "http://localhost:2024/api/v1/admin/sellers"
      );
      const sellers = resSellers.data.categorizedSellers;
      setSellerArray(sellers);
      // console.log(resSellers.data.categorizedSellers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSellerDisplay = (value) => {
    if (value === "active") {
      setDisplaySellers(sellerArray.active);
      setActive(value);
    }
    if (value === "pending") {
      setDisplaySellers(sellerArray.pending);
      setActive(value);
    }
    if (value === "delete") {
      setDisplaySellers(sellerArray.deleteRequested);
      setActive(value);
    }
    if (value === "suspended") {
      setDisplaySellers(sellerArray.suspended);
      setActive(value);
    }
  };
  useEffect(() => {
    getSellers();
  }, []);
  const handleBigContainer = () => {
    bigContainer === "small"
      ? setBigContainer("big")
      : setBigContainer("small");
  };
  // console.log(displaySellers);
  // console.log(active);
  console.log(bigContainer);
  return (
    <div className="admin-dashboard-main-container">
      <div className={`top-container ${bigContainer}`}>
        <div className="left">
          <div className="top-cards">
            <span>Active Sellers:</span>
            <strong>100</strong>
          </div>
          <div className="top-cards">
            <span>Active Customers:</span>
            <strong>100</strong>
          </div>
          <div className="top-cards">
            <span>Active Products:</span>
            <strong>100</strong>
          </div>
        </div>
        <div className="right">
          <div className="top-cards">
            <span>Products in Cart:</span>
            <strong>100</strong>
          </div>
          <div className="top-cards">
            <span>Products In Transit:</span>
            <strong>100</strong>
          </div>
          <div className="top-cards">
            <span>Total TransAction Value: </span>
            <strong>₹ 100</strong>
          </div>
        </div>
      </div>

      <div className="bottom-container" id={bigContainer}>
        <div className="bottom-container-top">
          <h2>Sellers</h2>
          <div onClick={() => handleBigContainer()}>^</div>
        </div>
        <div className="bt-nav">
          <div
            className={active === "active" ? "active" : ""}
            onClick={() => handleSellerDisplay("active")}
          >
            Active
          </div>
          <div
            className={active === "pending" ? "pending" : ""}
            onClick={() => handleSellerDisplay("pending")}
          >
            Pending
          </div>
          <div
            className={active === "delete" ? "delete" : ""}
            onClick={() => handleSellerDisplay("delete")}
          >
            Delete
          </div>
          <div
            className={active === "suspended" ? "suspended" : ""}
            onClick={() => handleSellerDisplay("suspended")}
          >
            suspended
          </div>
        </div>
        <div className="seller-container">
          {displaySellers.map((e) => (
            <div className="sellers-list">
              <div>{e.name}</div>
              <div>{e.email}</div>
              <div>{e.status}</div>
              <div>
                {e.status === "delete-requested" ? (
                  <button>delete seller</button>
                ) : (
                  ""
                )}
                {e.status === "pending" ? <button>approve seller</button> : ""}
                {e.status === "suspend" ? <button>suspend seller</button> : ""}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default AdminDashBoard;
