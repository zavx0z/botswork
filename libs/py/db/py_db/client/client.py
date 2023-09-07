from datetime import datetime

from sqlalchemy import UniqueConstraint, Column, Integer, DateTime, UUID, ForeignKey
from sqlalchemy.orm import relationship

from py_db.client import DeviceBrowserOs
from py_db.shared import Base


class Client(Base):
    __tablename__ = "client"
    __table_args__ = (UniqueConstraint('user_id', 'device_browser_os_id', name='unique_client'),)

    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)

    # Отношение между Client и User
    user_id = Column(UUID(as_uuid=True), ForeignKey('user.id'), nullable=False)
    user = relationship("User", back_populates="client")

    # Отношение между Client и DeviceBrowserOs
    device_browser_os_id = Column(Integer, ForeignKey('device_browser_os.id'), unique=True, nullable=False)
    device_browser_os = relationship(DeviceBrowserOs, back_populates="client")

    def __str__(self):
        return f"<Client: {self.user.username} {self.device_browser_os.id}>"

    def __repr__(self):
        return self.__str__()
