import React, { useEffect, useRef, useState } from 'react';

export const GoogleAddressInput = ({ onPlaceSelected }) => {
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const [selectedAddress, setSelectedAddress] = useState('');

  useEffect(() => {
    const init = async () => {
      if (!window.google?.maps?.places?.PlaceAutocompleteElement) return;

      await window.google.maps.importLibrary('places');
      if (!containerRef.current) return;

      const elem = new window.google.maps.places.PlaceAutocompleteElement();
      elem.classList.add('autocomplete-input');
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(elem);

      inputRef.current = elem.shadowRoot?.querySelector('input');

      elem.addEventListener('gmp-select', async (event) => {
        const prediction = event.placePrediction;
        const place = await prediction.toPlace();
        await place.fetchFields({
          fields: ['formattedAddress', 'location'],
        });

        const address = place.formattedAddress;

        // ✅ This works even if the component resets the input
        setSelectedAddress(address);

        // Optional: forcibly reset the visible value inside the shadow input (somewhat unreliable)
        if (inputRef.current) {
          inputRef.current.value = address;
        }

        onPlaceSelected?.({
          name: address,
          location: {
            lat: place.location.latitude,
            lng: place.location.longitude,
          },
        });
      });
    };

    init();
  }, [onPlaceSelected]);

  return (
    <div className="address-form">
      <label className="address-label">Enter Address</label>
      <div ref={containerRef} className="address-container" />

      {selectedAddress && (
        <p className="address-selected">Selected: {selectedAddress}</p>
      )}
    </div>
  );
};