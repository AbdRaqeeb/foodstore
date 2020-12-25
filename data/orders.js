const orders = [
    {
        _id: "5fe5bb6e390d9714ac57aec1",
        user: "5fe5a36a8c1ca1209c48f7be",
        reference: "2WRMRRDCPCM8PE2",
        shippingAddress: {
            country: "Nigeria",
            address: "Redeemed Street Dutse Baupma",
            city: "Abuja"
        },
        status: "en-route",
        paymentMethod: "card",
        shippingPrice: 300,
        itemsPrice: 3700,
        totalPrice: 4000,
        isPaid: true,
        isDelivered: false,
        orderItems: [
            {
                name: "Beef Flap",
                qty: 2,
                price: 350,
                product: "5fe5a36a8c1ca1209c48f7dd"
            },
            {
                name: "Peaches",
                qty: 2,
                price: 1500,
                product: "5fe5a36a8c1ca1209c48f7e3"
            }
        ],
        paidAt: `${Date.now()}`,
        paymentResult: {
            data: {
                customer: {
                    id: 36113448,
                    customer_code: "CUS_xj1jbbibl86mu5r",
                    name: "Customer",
                    email: "user@example.com"
                },
                amount: "20000",
                currency: "NGN",
                transaction_date: "2020-12-25T05:55:57.000Z",
                status: "success",
                reference: "1608875730700",
                domain: "test",
                gateway_response: "Successful",
                message: null,
                channel: "card",
                plan: null,
                requested_amount: 20000
            },
            status: true,
            message: "Verification successful"
        }
    },
    {
        _id: "5fe5bb6e390d9714ac57aec2",
        user: "5fe5a36a8c1ca1209c48f7be",
        reference: "5HR4PYX52T1YHDM",
        shippingAddress: {
            country: "Nigeria",
            address: "Charly Boy Junction, Gwarinpa",
            city: "Gwarinpa"
        },
        status: "processing",
        paymentMethod: "on-delivery",
        shippingPrice: 300,
        itemsPrice: 3700,
        totalPrice: 4000,
        isPaid: false,
        isDelivered: false,
        orderItems: [
            {
                name: "Beef Flap",
                qty: 2,
                price: 350,
                product: "5fe5a36a8c1ca1209c48f7dd"
            },
            {
                name: "Peaches",
                qty: 2,
                price: 1500,
                product: "5fe5a36a8c1ca1209c48f7e3"
            }
        ],
    },
    {
        _id: "5fe5bb6e390d9714ac57aec3",
        user: "5fe5a36a8c1ca1209c48f7be",
        reference: "5RXRP2WYDRTUC4R",
        shippingAddress: {
            country: "Nigeria",
            address: "Wuse Zone B",
            city: "Abuja"
        },
        status: "delivered",
        paymentMethod: "card",
        shippingPrice: 300,
        itemsPrice: 3700,
        totalPrice: 4000,
        isPaid: true,
        isDelivered: true,
        orderItems: [
            {
                name: "Beef Flap",
                qty: 2,
                price: 350,
                product: "5fe5a36a8c1ca1209c48f7dd"
            },
            {
                name: "Peaches",
                qty: 2,
                price: 1500,
                product: "5fe5a36a8c1ca1209c48f7e3"
            }
        ],
        paidAt: `${Date.now()}`,
        paymentResult: {
            data: {
                customer: {
                    id: 36113448,
                    customer_code: "CUS_xj1jbbibl86mu5r",
                    name: "Customer",
                    email: "user@example.com"
                },
                amount: "20000",
                currency: "NGN",
                transaction_date: "2020-12-25T05:55:57.000Z",
                status: "success",
                reference: "1608875730700",
                domain: "test",
                gateway_response: "Successful",
                message: null,
                channel: "card",
                plan: null,
                requested_amount: 20000
            },
            status: true,
            message: "Verification successful"
        }
    },
    {
        _id: "5fe5bb6e390d9714ac57aec4",
        user: "5fe5a36a8c1ca1209c48f7bf",
        reference: "YKK8TEU52U008P1",
        shippingAddress: {
            country: "Nigeria",
            address: "Zone 2 Dutsen Alhaji, Bwari Road",
            city: "Abuja"
        },
        status: "pending",
        paymentMethod: "card",
        shippingPrice: 300,
        itemsPrice: 3700,
        totalPrice: 4000,
        isPaid: false,
        isDelivered: false,
        orderItems: [
            {
                name: "Beef Flap",
                qty: 2,
                price: 350,
                product: "5fe5a36a8c1ca1209c48f7dd"
            },
            {
                name: "Peaches",
                qty: 2,
                price: 1500,
                product: "5fe5a36a8c1ca1209c48f7e3"
            }
        ],
    },
    {
        _id: "5fe5bb6e390d9714ac57aec5",
        user: "5fe5a36a8c1ca1209c48f7bf",
        reference: "HY8CH0UURURY8PR",
        shippingAddress: {
            country: "Nigeria",
            address: "Kubwa",
            city: "Abuja"
        },
        status: "processing",
        paymentMethod: "card",
        shippingPrice: 300,
        itemsPrice: 3700,
        totalPrice: 4000,
        isPaid: false,
        isDelivered: false,
        orderItems: [
            {
                name: "Beef Flap",
                qty: 2,
                price: 350,
                product: "5fe5a36a8c1ca1209c48f7dd"
            },
            {
                name: "Peaches",
                qty: 2,
                price: 1500,
                product: "5fe5a36a8c1ca1209c48f7e3"
            }
        ],
    },
    {
        _id: "5fe5bb6e390d9714ac57aec6",
        user: "5fe5a36a8c1ca1209c48f7bf",
        reference: "MMURHE5CKX0MXUH",
        shippingAddress: {
            country: "Nigeria",
            address: "Zuba Road, Gwagwalada",
            city: "Abuja"
        },
        status: "canceled",
        paymentMethod: "on-delivery",
        shippingPrice: 300,
        itemsPrice: 3700,
        totalPrice: 4000,
        isPaid: false,
        isDelivered: false,
        orderItems: [
            {
                name: "Beef Flap",
                qty: 2,
                price: 350,
                product: "5fe5a36a8c1ca1209c48f7dd"
            },
            {
                name: "Peaches",
                qty: 2,
                price: 1500,
                product: "5fe5a36a8c1ca1209c48f7e3"
            }
        ],
    },
    {
        _id: "5fe5bb6e390d9714ac57aec7",
        user: "5fe5a36a8c1ca1209c48f7c0",
        reference: "8TR1HP24C4EM8CM",
        shippingAddress: {
            country: "Nigeria",
            address: "Central Business District, Garki",
            city: "Abuja"
        },
        status: "processing",
        paymentMethod: "card",
        shippingPrice: 300,
        itemsPrice: 3700,
        totalPrice: 4000,
        isPaid: true,
        isDelivered: false,
        orderItems: [
            {
                name: "Beef Flap",
                qty: 2,
                price: 350,
                product: "5fe5a36a8c1ca1209c48f7dd"
            },
            {
                name: "Peaches",
                qty: 2,
                price: 1500,
                product: "5fe5a36a8c1ca1209c48f7e3"
            }
        ],
        paidAt: `${Date.now()}`,
        paymentResult: {
            data: {
                customer: {
                    id: 36113448,
                    customer_code: "CUS_xj1jbbibl86mu5r",
                    name: "Customer",
                    email: "user@example.com"
                },
                amount: "20000",
                currency: "NGN",
                transaction_date: "2020-12-25T05:55:57.000Z",
                status: "success",
                reference: "1608875730700",
                domain: "test",
                gateway_response: "Successful",
                message: null,
                channel: "card",
                plan: null,
                requested_amount: 20000
            },
            status: true,
            message: "Verification successful"
        }
    },
    {
        _id: "5fe5bb6e390d9714ac57aec8",
        user: "5fe5a36a8c1ca1209c48f7c0",
        reference: "DD8145HHYX812DY",
        shippingAddress: {
            country: "Nigeria",
            address: "Idu Road",
            city: "Abuja"
        },
        status: "pending",
        paymentMethod: "card",
        shippingPrice: 300,
        itemsPrice: 3700,
        totalPrice: 4000,
        isPaid: false,
        isDelivered: false,
        orderItems: [
            {
                name: "Beef Flap",
                qty: 2,
                price: 350,
                product: "5fe5a36a8c1ca1209c48f7dd"
            },
            {
                name: "Peaches",
                qty: 2,
                price: 1500,
                product: "5fe5a36a8c1ca1209c48f7e3"
            }
        ]
    },
    {
        _id: "5fe5bb6e390d9714ac57aec9",
        user: "5fe5a36a8c1ca1209c48f7c0",
        reference: "1CEW05K0RMKD58D",
        shippingAddress: {
            country: "Nigeria",
            address: "Total Child Academy, Dutse Makaranta, Bwari Road",
            city: "Abuja"
        },
        status: "delivered",
        paymentMethod: "card",
        shippingPrice: 300,
        itemsPrice: 3700,
        totalPrice: 4000,
        isPaid: true,
        isDelivered: true,
        orderItems: [
            {
                name: "Beef Flap",
                qty: 2,
                price: 350,
                product: "5fe5a36a8c1ca1209c48f7dd"
            },
            {
                name: "Peaches",
                qty: 2,
                price: 1500,
                product: "5fe5a36a8c1ca1209c48f7e3"
            }
        ],
        paidAt: `${Date.now()}`,
        paymentResult: {
            data: {
                customer: {
                    id: 36113448,
                    customer_code: "CUS_xj1jbbibl86mu5r",
                    name: "Customer",
                    email: "user@example.com"
                },
                amount: "20000",
                currency: "NGN",
                transaction_date: "2020-12-25T05:55:57.000Z",
                status: "success",
                reference: "1608875730700",
                domain: "test",
                gateway_response: "Successful",
                message: null,
                channel: "card",
                plan: null,
                requested_amount: 20000
            },
            status: true,
            message: "Verification successful"
        }
    },
];

export default orders;