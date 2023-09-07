from sqlalchemy import Column, Integer, UUID, ForeignKey
from sqlalchemy.orm import relationship

from py_db.shared import Base


class DialogParticipant(Base):
    __tablename__ = "dialog_participant"
    id = Column(Integer, primary_key=True)

    user_id = Column(UUID(as_uuid=True), ForeignKey('user.id'), nullable=False)
    user = relationship("User", back_populates="dialogs")

    dialog_id = Column(Integer, ForeignKey("dialog.id"), nullable=False)
    dialog = relationship("Dialog", back_populates="participants")
