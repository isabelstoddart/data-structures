# Weekly Assignment 4
### For data structures at Parsons School of Design

## Part One
Part one of this assignment was to make a data model of the AA Meetings data.I decided to make a normalized data model because I noticed that some of the building addresses are the same for multiple meetings, so I thought having a normalized data model (with multiple tables) would make distinguishing between the different meetings with the same address easier. 

I made an ERD (Entity Relationship Diagram) using Lucidchart shown below.

![](aa_meetingsERD.png)

The datasets included are:
Addresses (Address Id PK, Address Street Info, Latitude, Longitude, City, State, Zipcode, Borough, Zone)
Meetings (Meeting ID PK, Meeting Type, Meeting Address FK, Meeting Room, Meeting Time FK, Special Interest, Wheelchair Access)
Times (Time ID PK, Day of Week, Start Time, End Time)

I made Addresses and Times into separate datasets from the main data set (Meetings) because there can be multiple meetings with the same address and time and it would be redundant to repeat these in the main dataset.
