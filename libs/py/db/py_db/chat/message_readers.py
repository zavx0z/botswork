from datetime import datetime

from sqlalchemy import Column, Integer, ForeignKey, UUID, DateTime, PrimaryKeyConstraint
from sqlalchemy.orm import relationship

from py_db.chat import Message
from py_db.shared import Base


class MessageReaders(Base):
    __tablename__ = 'message_readers'

    message_id = Column(Integer, ForeignKey('message.id'), primary_key=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey('user.id'), nullable=False, primary_key=True)
    read_time = Column(DateTime, default=datetime.utcnow, nullable=False)

    message = relationship(Message, back_populates="readers_association", overlaps="read_message")
    user = relationship("User")
    __table_args__ = (PrimaryKeyConstraint('message_id', 'user_id'),)
