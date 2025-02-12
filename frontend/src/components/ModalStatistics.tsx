import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface ModalStatisticsProps {
  show: any;
  setShow: any;
  locations: any;
}

const ModalStatistics: React.FC<ModalStatisticsProps> = ({
  show,
  setShow,
  locations,
}) => {
  const [countAndPrice, setCountAndPrice] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchInventoryCount = async () => {
    setLoading(true);
    const countAndPriceData: any[] = [];

    for (const location of locations) {
      try {
        const responseTotalCount = await fetch(
          `http://localhost:5000/inventories?count=${location.id}`
        );
        const dataTotalCount = await responseTotalCount.json();

        const responseTotalPrice = await fetch(
          `http://localhost:5000/inventories?price=${location.id}`
        );
        const dataTotalPrices = await responseTotalPrice.json();

        countAndPriceData.push({
          id: location.id,
          name: location.name,
          count: dataTotalCount.total,
          price: dataTotalPrices.price,
        });
      } catch (error) {
        console.error("Error fetching inventory count and/or price:", error);
      }
    }

    setCountAndPrice(countAndPriceData);
    setLoading(false);
  };

  useEffect(() => {
    if (show) fetchInventoryCount();
  }, [show, locations]);

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Statistics</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-dark table-striped text-center align-middle">
            <thead>
              <tr>
                <th className="align-middle">კინოთეატრი</th>
                <th className="align-middle">პროდუქტების ჯამური რაოდენობა</th>
                <th className="align-middle">
                  პროდუქტების ჯამური საფასური (₾)
                </th>
              </tr>
            </thead>
            <tbody>
              {countAndPrice?.length > 0 ? (
                countAndPrice.map((countAndPriceItem: any) => {
                  return (
                    <tr key={countAndPriceItem?.id}>
                      <th>{countAndPriceItem?.name}</th>
                      <td>{countAndPriceItem?.count}</td>
                      <td>{countAndPriceItem?.price}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4}>No Location found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalStatistics;
