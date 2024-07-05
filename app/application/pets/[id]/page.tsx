const PetDetail = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1>{params.id}</h1>
      {/* Affichez d'autres informations sur l'animal */}
    </div>
  );
};
export default PetDetail;
