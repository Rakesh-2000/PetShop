import { useState, useCallback } from 'react';
import { Pet, DogImageResponse, ApiResponse } from '../Types';
import { usePetStore } from '../Store/usePetStore';

export const useSubmitPet = () => {
  const addPet = usePetStore((s) => s.addPet);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitPet = useCallback(
    async (petData: Omit<Pet, 'id' | 'submittedAt'>) => {
      setLoading(true);
      setError(null);
      setSuccess(false);
      try {
        console.log("IN")
        const res = await fetch('https://reqres.in/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: petData.name,
            job: `${petData.breed} | ${petData.age} | $${petData.price}`,
          }),
        });
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data: ApiResponse = await res.json();

        addPet({
          ...petData,
          id: data.id ?? String(Date.now()),
          submittedAt: data.createdAt,
        });
        setSuccess(true);
      } catch (e: any) {
        setError(e.message ?? 'Something went wrong');
      } finally {
        setLoading(false);
      }
    },
    [addPet],
  );

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return { submitPet, loading, error, success, reset };
};

export const useFetchDogImage = () => {
  const setRandomDogImage = usePetStore((s) => s.setRandomDogImage);
  const setIsFetchingDogImage = usePetStore((s) => s.setIsFetchingDogImage);
  const [error, setError] = useState<string | null>(null);

  const fetchDogImage = useCallback(async () => {
    setIsFetchingDogImage(true);
    setError(null);
    try {
      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data: DogImageResponse = await res.json();
      setRandomDogImage(data.message);
    } catch (e: any) {
      setError(e.message ?? 'Failed to fetch image');
    } finally {
      setIsFetchingDogImage(false);
    }
  }, [setIsFetchingDogImage, setRandomDogImage]);

  return { fetchDogImage, error };
};
