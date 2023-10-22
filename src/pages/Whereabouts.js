import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import Legend from "../components/Legend";
import supabase from "../config/supabaseClient";
import "../assets/styles/app.css";
import "../assets/styles/header.css";
import "../assets/styles/search-sort.css";

const Whereabouts = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  const [originalData, setOriginalData] = useState([]);
  const [status, setStatus] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [department, setDepartment] = useState(null);
  const [images, setImages] = useState(null)
  const CDNURL = "https://cgnhfvymwwlhctrhqpbc.supabase.co/storage/v1/object/public/avatars/"
  //https://cgnhfvymwwlhctrhqpbc.supabase.co/storage/v1/object/public/avatars/admin/4591933b-7e62-472a-a485-2d085b191a2c


  useEffect(() => {
    const fetchStatusData = async () => {
      const { data, error } = await supabase.from("status").select("statusName, statusColor");
      setStatus(data);
    };

    fetchStatusData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch whereabouts data along with related profiles data
        const { data: instructorData, error } = await supabase
          .from("whereabouts")
          .select("*, profiles(*)")
          .order("time", { ascending: false });

        if (error) {
          throw new Error(error.message);
        }

        const formattedData = instructorData
          .filter((data) => data.profiles.accountStatus !== null)
          .map((data) => ({
            status: data.profiles.status,
            name: `${data.profiles.lastname}, ${data.profiles.firstname} ${data.profiles.middlename.charAt(0).toUpperCase()}.`,
            roomName: data.roomName ?? null,
            roomNumber: data.roomNumber ?? null,
            activityName: data.activityName ?? null,
            departmentName: data.profiles.departmentname,
          }));

        formattedData.sort((a, b) => {
          if (a.status === null && b.status === null) {
            if (a.roomName || a.roomNumber || a.activityName) return -1;
            if (b.roomName || b.roomNumber || b.activityName) return 1;
            return 0;
          }
          if (a.status === null) return 1;
          if (b.status === null) return -1;
          if (!a.roomName && !a.roomNumber && !a.activityName) return -1;
          if (!b.roomName && !b.roomNumber && !b.activityName) return 1;
          return 0;
        });

        setOriginalData(formattedData || []);
      } catch (error) {
        console.error("Error fetching instructor data:", error);
      }
    };

    fetchData();

    const handleSubscription = supabase
      .channel("any")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "profiles" }, (payload) => {
        fetchData();
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "whereabouts" }, (payload) => {
        fetchData();
      })
      .subscribe();

    return () => {
      handleSubscription.unsubscribe();
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSortByDepartment = (departmentName) => {
    setSelectedDepartment(departmentName);
  };

  // Filtering the data based on the search input and selected department
  const filteredData = useMemo(() => {
    let filteredBySearch = originalData;
    if (searchInput) {
      filteredBySearch = originalData.filter((row) => {
        const nameMatch = row.name.toLowerCase().includes(searchInput.toLowerCase());
        const roomNameMatch = row.roomName && row.roomName.toLowerCase().includes(searchInput.toLowerCase());
        const roomNumberMatch = row.roomNumber && row.roomNumber.toString().toLowerCase().includes(searchInput.toLowerCase());
        const activityNameMatch = row.activityName && row.activityName.toLowerCase().includes(searchInput.toLowerCase());
        const departmentNameMatch = row.departmentName.toLowerCase().includes(searchInput.toLowerCase());

        return nameMatch || roomNameMatch || roomNumberMatch || activityNameMatch || departmentNameMatch;
      });
    }

    if (!selectedDepartment) {
      return filteredBySearch;
    }

    return filteredBySearch.filter((row) => row.departmentName.toLowerCase() === selectedDepartment.toLowerCase());
  }, [originalData, searchInput, selectedDepartment]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Room Name/Location",
        accessor: "roomName",
      },
      {
        Header: "Room Number",
        accessor: "roomNumber",
      },
      {
        Header: "Activity",
        accessor: "activityName",
      },
      {
        Header: "Department",
        accessor: "departmentName",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <div
            title={value}
            className="status-circle"
            style={{
              color: status.find((status) => status.statusName === value)?.statusColor || "none",
            }}
          >
            {value}
          </div>
        ),
      },
    ],
    [status]
  );

  useEffect(() => {
    const fetchDepartment = async () => {
      const { data, error } = await supabase.from("department").select();

      if (error) {
        setDepartment(null);
      } else if (data && data.length > 0) {
        setDepartment(data);
        setSelectedDepartment(null); // Set selectedDepartment to null to show all data by default
      }
    };
    fetchDepartment();
    const fetchImages = async () => {
      const { data, error } = await supabase
        .storage
        .from("avatars")
        .list("admin/", {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        });

      if (data) {
        setImages(data);
      }
    };

    fetchImages()
  }, []);

  return (
    <>
      {/* Legend and Home button */}
      <div className="kiosk-header-container">
        <div className="kiosk-header-menu">
          <div className="header-menu-item" onClick={navigateToHome} onTouchStart={navigateToHome}>
            <HiHome className="header-menu-item-ic" />
            <h4>Home</h4>
          </div>
        </div>
        <Legend />
      </div>

      {/* Sorter and Search bar */}
      <div className="sort-search-container">
        <div className="sorter">
          <div className="sorter-item" onClick={() => handleSortByDepartment(null)}>
            All
          </div>
          {department && images &&
            department.map((dept, index) => (
              <div
                className={`sorter-item ${selectedDepartment === dept.departmentName ? "active" : ""}`}
                key={index}
                onClick={() => handleSortByDepartment(dept.departmentName)}
              >
                <div className="sorter-item-overlay" />
                <img src={CDNURL + "admin/" + dept.departmentID} alt={dept.departmentAcronym} className="dept-logo" />
              </div>
            ))}
        </div>
        <div className="search-bar">
          <div className="border">
            <FaSearch className="search-ic" size={20} />
            <input
              type="search"
              id="search"
              className="search"
              name="search"
              placeholder="Search here"
              value={searchInput}
              onChange={handleSearchChange}
              autoComplete="off"
            />
          </div>
        </div>
      </div>

      {/* DataTable with the filteredData */}
      <DataTable columns={columns} data={filteredData} />
    </>
  );
};

export default Whereabouts;
