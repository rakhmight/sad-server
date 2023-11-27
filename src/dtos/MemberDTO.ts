export default function(member:MemberI):MemberDTOI{
    const memberDTO:MemberDTOI = {
        id: member._id,
        fullName: member.fullName,
        department: member.department
    }

    return memberDTO
}