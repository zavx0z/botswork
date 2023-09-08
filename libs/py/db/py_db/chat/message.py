from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID

from py_db.shared import Base


class Message(Base):
    __tablename__ = "message"
    id = Column(Integer, primary_key=True)
    text = Column(String(length=1000), nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    sender_id = Column(UUID(as_uuid=True), ForeignKey('user.id'), nullable=False)
    sender = relationship("User", foreign_keys=[sender_id])
    dialog_id = Column(Integer, ForeignKey("dialog.id"), nullable=False)

    readers_association = relationship('MessageReaders', backref='read_message', cascade='all, delete-orphan')
    readers = association_proxy('readers_association', 'user')

    def __str__(self):
        return f"{self.sender_id}_{self.text[:10]}"

    def __repr__(self):
        return self.__str__()
