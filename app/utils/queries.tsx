import { gql } from 'urql';

{/* Public Listings */}
const FETCH_LISTINGS = gql`
    query PublicListing($search: String, $first: Int, $after: String){
    publicListing(
        first: $first,
        after: $after,
        filter: {
            or: [
                {name: {icontains: $search}}
                {description: {icontains: $search}}
            ]
        }
        ){
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
        }
        edges {
        cursor
        node {
            id,
            name,
            description,
            price,
            images,
            propertyUnitFeatures{
                bedrooms,
                bathrooms,
                toilets,
                parkingSpace
            }
        }
        }
    }
  }
`;

const UNIT_BY_ID = gql`
  query unitById($id: String) {
    unitById(id: $id) {
      id,
      name,
      quantity,
      price,
      propertyUnitFeatures{
        bathrooms,
        bedrooms,
        toilets,
        parkingSpace,
        floorNumber
      }
      type,
      furnishing,
      category, 
      images
    }
  }
`;

export {
    FETCH_LISTINGS,
    UNIT_BY_ID
}