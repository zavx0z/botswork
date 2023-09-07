from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from py_db.chat.message import Message
from py_db.shared import Base


class Dialog(Base):
    __tablename__ = "dialog"
    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    owner_id = Column(UUID(as_uuid=True), ForeignKey('user.id'), nullable=False)

    owner = relationship("User", back_populates="owner_dialogs")
    participants = relationship("DialogParticipant", back_populates="dialog")
    messages = relationship(Message, backref='dialog')

    def __str__(self):
        return f"{self.name}_{self.owner_id}"

    def __repr__(self):
        return self.__str__()
