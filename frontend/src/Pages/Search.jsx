import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const newSidebarData = {
      searchTerm: urlParams.get('searchTerm') || '',
      type: urlParams.get('type') || 'all',
      parking: urlParams.get('parking') === 'true',
      furnished: urlParams.get('furnished') === 'true',
      offer: urlParams.get('offer') === 'true',
      sort: urlParams.get('sort') || 'createdAt',
      order: urlParams.get('order') || 'desc',
    };

    const fetchListings = async () => {
      try {
        setLoading(true);
        setShowMore(false);

        const searchQuery = urlParams.toString();

        const res = await fetch(
          `/api/listing/get?${searchQuery}`
        );

        if (!res.ok) {
          throw new Error('Failed to fetch listings');
        }

        const data = await res.json();

        setListings(data);
        setShowMore(data.length > 8);

        if (location.search.length > 0) {
          setSidebardata(newSidebarData);
        }
      } catch (error) {
        console.log(error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (['all', 'rent', 'sale'].includes(e.target.id)) {
      setSidebardata((prev) => ({
        ...prev,
        type: e.target.id,
      }));
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata((prev) => ({
        ...prev,
        searchTerm: e.target.value,
      }));
    }

    if (
      ['parking', 'furnished', 'offer'].includes(
        e.target.id
      )
    ) {
      setSidebardata((prev) => ({
        ...prev,
        [e.target.id]: e.target.checked,
      }));
    }

    if (e.target.id === 'sort_order') {
      const [sort, order] =
        e.target.value.split('_');

      setSidebardata((prev) => ({
        ...prev,
        sort: sort || 'createdAt',
        order: order || 'desc',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();

    urlParams.set(
      'searchTerm',
      sidebardata.searchTerm
    );

    urlParams.set('type', sidebardata.type);

    urlParams.set(
      'parking',
      sidebardata.parking
    );

    urlParams.set(
      'furnished',
      sidebardata.furnished
    );

    urlParams.set('offer', sidebardata.offer);

    urlParams.set('sort', sidebardata.sort);

    urlParams.set('order', sidebardata.order);

    navigate(
      `/search?${urlParams.toString()}`
    );
  };

  const onShowMoreClick = async () => {
    try {
      const startIndex = listings.length;

      const urlParams = new URLSearchParams(
        location.search
      );

      urlParams.set(
        'startIndex',
        startIndex
      );

      const res = await fetch(
        `/api/listing/get?${urlParams.toString()}`
      );

      if (!res.ok) {
        throw new Error(
          'Failed to load more listings'
        );
      }

      const data = await res.json();

      setListings((prev) => [
        ...prev,
        ...data,
      ]);

      if (data.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col md:flex-row bg-black min-h-screen'>
      
      {/* Sidebar */}
      <div className='w-full md:w-[320px] p-8 border-b md:border-r border-slate-800 bg-[#0f172a]'>
        
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-8'
        >
          
          {/* Search */}
          <div className='flex flex-col gap-3'>
            <label className='font-semibold text-white text-lg'>
              Search Term
            </label>

            <input
              type='text'
              id='searchTerm'
              placeholder='Search properties...'
              className='border border-slate-600 bg-[#111827] text-white rounded-xl p-4 w-full outline-none focus:border-yellow-500'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>

          {/* Type */}
          <div className='flex flex-col gap-4'>
            <label className='font-semibold text-white text-lg'>
              Property Type
            </label>

            <div className='flex flex-col gap-4 text-white'>
              
              <label className='flex items-center gap-3 cursor-pointer'>
                <input
                  type='checkbox'
                  id='all'
                  className='w-5 h-5 accent-yellow-500'
                  checked={sidebardata.type === 'all'}
                  onChange={handleChange}
                />
                <span>Rent & Sale</span>
              </label>

              <label className='flex items-center gap-3 cursor-pointer'>
                <input
                  type='checkbox'
                  id='rent'
                  className='w-5 h-5 accent-yellow-500'
                  checked={sidebardata.type === 'rent'}
                  onChange={handleChange}
                />
                <span>Rent</span>
              </label>

              <label className='flex items-center gap-3 cursor-pointer'>
                <input
                  type='checkbox'
                  id='sale'
                  className='w-5 h-5 accent-yellow-500'
                  checked={sidebardata.type === 'sale'}
                  onChange={handleChange}
                />
                <span>Sale</span>
              </label>

              <label className='flex items-center gap-3 cursor-pointer'>
                <input
                  type='checkbox'
                  id='offer'
                  className='w-5 h-5 accent-yellow-500'
                  checked={sidebardata.offer}
                  onChange={handleChange}
                />
                <span>Offers Only</span>
              </label>

            </div>
          </div>

          {/* Amenities */}
          <div className='flex flex-col gap-4'>
            <label className='font-semibold text-white text-lg'>
              Amenities
            </label>

            <div className='flex flex-col gap-4 text-white'>
              
              <label className='flex items-center gap-3 cursor-pointer'>
                <input
                  type='checkbox'
                  id='parking'
                  className='w-5 h-5 accent-yellow-500'
                  checked={sidebardata.parking}
                  onChange={handleChange}
                />
                <span>Parking</span>
              </label>

              <label className='flex items-center gap-3 cursor-pointer'>
                <input
                  type='checkbox'
                  id='furnished'
                  className='w-5 h-5 accent-yellow-500'
                  checked={sidebardata.furnished}
                  onChange={handleChange}
                />
                <span>Furnished</span>
              </label>

            </div>
          </div>

          {/* Sort */}
          <div className='flex flex-col gap-3'>
            <label className='font-semibold text-white text-lg'>
              Sort By
            </label>

            <select
              id='sort_order'
              className='border border-slate-600 bg-[#111827] text-white rounded-xl p-4 outline-none focus:border-yellow-500'
              onChange={handleChange}
              value={`${sidebardata.sort}_${sidebardata.order}`}
            >
              <option value='regularPrice_desc'>
                Price high to low
              </option>

              <option value='regularPrice_asc'>
                Price low to high
              </option>

              <option value='createdAt_desc'>
                Latest
              </option>

              <option value='createdAt_asc'>
                Oldest
              </option>
            </select>
          </div>

          {/* Button */}
          <button className='bg-yellow-500 text-black font-bold p-4 rounded-xl uppercase hover:bg-yellow-400 transition duration-300 tracking-wider'>
            Search
          </button>

        </form>
      </div>

      {/* Results */}
      <div className='flex-1 bg-black'>
        
        <h1 className='text-3xl font-bold border-b border-slate-800 p-6 text-white'>
          Listing Results
        </h1>

        <div className='p-6 flex flex-wrap gap-6'>
          
          {!loading &&
            listings.length === 0 && (
              <p className='text-xl text-slate-300'>
                No listings found!
              </p>
            )}

          {loading && (
            <p className='text-xl text-slate-300 text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem
                key={listing._id}
                listing={listing}
              />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-yellow-500 hover:underline p-7 text-center w-full text-lg'
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}