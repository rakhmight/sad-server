export default function(order:OrderI):OrderDTOI{
    const orderDTO:OrderDTOI = {
        id: order._id,
        department: order.department,
        members: order.members,
        createdAt: order.createdAt
    }

    return orderDTO
}