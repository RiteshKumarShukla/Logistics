import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Flex,
    Container,
    Heading,
    Text,
    Image,
    useColorModeValue,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Select,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import axios from "axios";

function ViewItem() {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [deliveryVehicles, setDeliveryVehicles] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [selectedVehicle, setSelectedVehicle] = useState("");
    const [showModal, setShowModal] = useState(false);
    const bgColor = useColorModeValue("gray.100", "gray.800");

    const dummyImages = [
        "https://images.unsplash.com/photo-1426024084828-5da21e13f5dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlJTIwYW5kJTIwbGFwdG9wfGVufDB8fDB8fHww&w=1000&q=80",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZlu99v76I5u1Weu6iL6sAljm55brvyHfRsQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlq7_aHPW6wEcve0KkO829s7zu08b8KH0gZw&usqp=CAU",
        "https://qph.cf2.quoracdn.net/main-qimg-cb9c5ea6829780dac00ee813f4cb2d5d-lq",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrkkcfu80ri3-Spc8oWX4CROYnvO1H_vlPBA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4395X4DyjclIV3q6g1wvOjkRFiuDZtFELytR-Pa0GajC9aaiL_y_SjgOzFg2ybxCeN14&usqp=CAU",
        "https://previews.123rf.com/images/fkdkondmi/fkdkondmi1303/fkdkondmi130300019/18690691-laptop-tablet-pc-mobile-phone-tv-and-navigator-with-nature-wallpaper-are-shown-in-the-image.jpg",
    ];

    function getRandomImage() {
        return dummyImages[Math.floor(Math.random() * dummyImages.length)];
    }

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/items/${itemId}`)
            .then((response) => {
                setItem(response.data);
            })
            .catch((error) => {
                console.error("Error fetching item details:", error);
            });

        axios
            .get("http://localhost:5000/api/customers")
            .then((response) => {
                setCustomers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching customers:", error);
            });

        axios
            .get("http://localhost:5000/api/delivery-vehicles")
            .then((response) => {
                setDeliveryVehicles(response.data);
            })
            .catch((error) => {
                console.error("Error fetching delivery vehicles:", error);
            });
    }, [itemId]);

    function generateOrderNumber() {
        const randomDigits = Math.floor(Math.random() * 10000); 
        const timestamp = Date.now(); 
        const orderNumber = `ORDER-${timestamp}-${randomDigits}`; 
        return orderNumber;
    }


    const handleAddToOrder = async () => {
        try {
            const orderData = {
                orderNumber: generateOrderNumber(),
                itemId: item._id,
                price: item.price,
                customerId: selectedCustomer,
                deliveryVehicleId: selectedVehicle,
                isDelivered: false,
            };

            await axios.post('http://localhost:5000/api/orders', orderData);
            setShowModal(false);
            Swal.fire({
                icon: 'success',
                title: 'Added to Order',
                text: 'Item added to order successfully!',
            });
        } catch (error) {
            console.error('Error adding order:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while adding the item to the order.',
            });
        }
    }

    const handleOpenModal = () =>{
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxW="container.lg" py={8}>
            <Flex
                justify="center"
                align="center"
                direction="column"
                bg={bgColor}
                p={8}
                rounded="lg"
                shadow="md"
                textAlign="center"
            >
                <Heading as="h1" size="xl" mb={4}>
                    View Item Details
                </Heading>
                <Image
                    src={getRandomImage()}
                    alt={item.name}
                    w="50%"
                    h="50%"
                    mb={4}
                    borderRadius="md"
                    objectFit="cover"
                />
                <Heading as="h2" size="lg" mb={2}>
                    {item.name}
                </Heading>
                <Text fontSize="lg">Price: ${item.price}</Text>
                <Button colorScheme="blue" mt={4} onClick={handleOpenModal}>
                    Add To Order
                </Button>
            </Flex>
            <Modal isOpen={showModal} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add To Order</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Select
                            placeholder="Select Customer"
                            value={selectedCustomer}
                            onChange={(e) => setSelectedCustomer(e.target.value)}
                            mb={4}
                        >
                            {customers.map((customer) => (
                                <option key={customer._id} value={customer._id}>
                                    {customer.name}
                                </option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Select Delivery Vehicle"
                            value={selectedVehicle}
                            onChange={(e) => setSelectedVehicle(e.target.value)}
                        >
                            {deliveryVehicles.map((vehicle) => (
                                <option key={vehicle._id} value={vehicle._id}>
                                    {vehicle.registrationNumber}
                                </option>
                            ))}
                        </Select>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleAddToOrder}>
                            Add
                        </Button>
                        <Button variant="ghost" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
}

export default ViewItem;
