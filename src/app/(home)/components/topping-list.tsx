import React, { startTransition, useEffect, useState } from 'react';
import ToppingCard from './topping-card';
import { Topping } from '@/lib/types';

const ToppingList = async ({
    selectedToppings,
    handleCheckBoxCheck,
}: {
    selectedToppings: Topping[];
    handleCheckBoxCheck: (topping: Topping) => void;
}) => {
    const [toppings, setToppings] = useState<Topping[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const toppingResponse = await fetch(
                // todo: make tenantId dynamic
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=10`
            );
            const toppings = await toppingResponse.json();
            setToppings(toppings);
            console.log('toppings', toppings);
        };
        fetchData();
    }, []);

    return (
        <section className="mt-6">
            <h3>Extra toppings</h3>
            <div className="grid grid-cols-3 gap-4 mt-2">
                {toppings.map((topping) => {
                    return (
                        <ToppingCard
                            topping={topping}
                            key={topping.id}
                            selectedToppings={selectedToppings}
                            handleCheckBoxCheck={handleCheckBoxCheck}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default ToppingList;
